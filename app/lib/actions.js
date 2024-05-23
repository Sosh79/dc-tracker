"use server"
import { Admin } from "./models";
import { dbConnect } from "./dbConnect";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";


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