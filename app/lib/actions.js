"use server"
import { Admin, Words } from "./models";
import { dbConnect } from "./dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { User } from "./models";

export const addAdmin = async (formData) => {
    const { username, password, email } = Object.fromEntries(formData)
    try {
        await dbConnect()
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            email
        });
        await newAdmin.save();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Admin");
    }
    revalidatePath("/dashboard/createAdmin");
    redirect("/dashboard/createAdmin")

}
export const editAdmin = async (formData) => {
    const { id, username, password, email } = Object.fromEntries(formData)
    try {
        await dbConnect()
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedAdmin = {
            username,
            password: hashedPassword,
            email
        }
        Object.keys(updatedAdmin).forEach((key) =>
            (updatedAdmin[key] === "" || undefined) && delete updatedAdmin[key]);

        await Admin.findByIdAndUpdate(id, updatedAdmin);

    } catch (error) {
        console.log(error);
        throw new Error("Failed to Edit Admin");
    }
    revalidatePath("/dashboard/createAdmin");
    redirect("/dashboard/createAdmin")

}
export const deleteAdmin = async (formData) => {
    const { id } = Object.fromEntries(formData)
    try {
        await dbConnect()
        await Admin.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete Admin");
    }
    revalidatePath("/dashboard/createAdmin");

}
export const authenticate = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
        await signIn("credentials", { username, password });
    } catch (err) {
        if (err.message.includes("CredentialsSignin")) {
            return "Incorrect username or password";
        }
        throw err;
    }
};
export const fetchUserSearch = async (formData) => {

    const { username, gamesname } = formData || {};
    const regex = new RegExp(gamesname, "i");

    if (!username || !gamesname) {
        throw new Error("Username and gamesname are required");
    }
    try {
        await dbConnect();
        const user = await User.findOne({ username: username });

        if (!user) {
            throw new Error("User not found");
        }

        const game = user.games.find(game => game.name === gamesname || game.name.match(regex));

        if (!game) {
            throw new Error("Game not found for the user");
        }

        const results = [
            {
                name: game.name,
                count: game.count,
                Positive: game.Positive,
                Negative: game.Negative,
                PositiveMessage: game.PositiveMessage,
                NegativeMessage: game.NegativeMessage,
            }
        ];
        return results;
    } catch (error) {
        console.error('Error fetching user search:', error);
        throw new Error("Failed to fetch Search");
    }
};



export const addWord = async (formData) => {
    const { name } = Object.fromEntries(formData)
    try {
        await dbConnect()
        const newWord = new Words({
            name,
        });
        await newWord.save();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Word");
    }
    revalidatePath("/dashboard/createWord");
    redirect("/dashboard/createWord")

}
export const editWord = async (formData) => {
    const { id, name } = Object.fromEntries(formData)
    try {
        await dbConnect()
        const updatedWord = {
            name,
        }
        Object.keys(updatedWord).forEach((key) =>
            (updatedWord[key] === "" || undefined) && delete updatedWord[key]);

        await Words.findByIdAndUpdate(id, updatedWord);

    } catch (error) {
        console.log(error);
        throw new Error("Failed to Edit Word");
    }
    revalidatePath("/dashboard/createWord");
    redirect("/dashboard/createWord")

}
export const deleteWord = async (formData) => {
    const { id } = Object.fromEntries(formData)
    try {
        await dbConnect()
        await Words.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete Word");
    }
    revalidatePath("/dashboard/createWord");

}