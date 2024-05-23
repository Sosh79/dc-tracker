import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authConfig";
import { dbConnect } from "./lib/dbConnect";
import { Admin } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
    try {
        dbConnect();
        const admin = await Admin.findOne({ username: credentials.username });

        if (!admin) throw new Error("Wrong credentials!");

        const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            admin.password
        );

        if (!isPasswordCorrect) throw new Error("Wrong credentials!");

        return admin;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to login!");
    }
};

export const { signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const admin = await login(credentials);
                    return admin;
                } catch (err) {
                    return null;
                }
            },
        }),
    ],
    // ADD ADDITIONAL INFORMATION TO SESSION
    callbacks: {
        async jwt({ token, admin }) {
            if (admin) {
                token.username = admin.username;
                token.img = admin.img;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.admin.username = token.username;
                session.admin.img = token.img;
            }
            return session;
        },
    },
});