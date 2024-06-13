"use server"
import { Admin, Words, Server } from "./models";
import { dbConnect } from "./dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { User } from "./models";

export const checkUsernameAndEmail = async (username, email) => {
    try {
        await dbConnect();
        const existingAdminUsername = await Admin.findOne({ username });
        const existingAdminEmail = await Admin.findOne({ email });

        if (existingAdminUsername) {
            return { message: "This username is already taken" };
        }

        if (existingAdminEmail) {
            return { message: "This email is already registered" };
        }

        return { message: "Both username and email are available" };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to check username and email");
    }
};

export const addAdmin = async (formData) => {
    const { username, password, email } = Object.fromEntries(formData);
    try {
        await dbConnect();
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
    redirect("/dashboard/createAdmin");
};
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
    try {
        await dbConnect();
        const user = await User.findOne({ username: username });
        const game = user.games.find(game => game.name === gamesname || game.name.match(regex));
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
        throw new Error("username or game name not found");
    }
};

export const addWord = async (formData) => {
    const { name } = Object.fromEntries(formData);
    try {
        await dbConnect();

        // Check if the word already exists
        const existingWord = await Words.findOne({ name });
        if (existingWord) {
            return { message: "This name already exists in the database" };
        }

        // Add the new word
        const newWord = new Words({ name });
        await newWord.save();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Word");
    }
    revalidatePath("/dashboard/createWord");
    redirect("/dashboard/createWord");
}
export const editWord = async (formData) => {
    const { id, name } = Object.fromEntries(formData)
    try {
        await dbConnect()
        const existingWord = await Words.findOne({ name });
        if (existingWord) {
            return { message: "This name already exists in the database" };
        }
        const updatedWord = {
            name,
        }
        Object.keys(updatedWord).forEach((key) =>
            (updatedWord[key] === "" || undefined) && delete updatedWord[key]);

        await Words.findByIdAndUpdate(id, updatedWord);

    } catch (error) {
        console.log(error);
        console.log("tesssssst");
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
export const addServer = async (formData) => {
    const { name, guildId, channelId } = Object.fromEntries(formData);
    try {
        await dbConnect();

        // Check if the word already exists
        const existingServer = await Server.findOne({ guildId });
        if (existingServer) {
            return { message: "This Server already exists in the database" };
        }

        // Add the new word
        const newServer = new Server({
            name,
            guildId,
            channelId,
        });
        await newServer.save();
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add Server");
    }
    revalidatePath("/dashboard/discordChat");
    redirect("/dashboard/discordChat")
}


export const deleteServer = async (formData) => {
    const { id } = Object.fromEntries(formData)
    try {
        await dbConnect()
        await Server.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to delete Server");
    }
    revalidatePath("/dashboard/discordChat");
}
