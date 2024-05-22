import { Admin, Games, User } from "./models";
import { dbConnect } from "./dbConnect";

export const fetchAdmins = async (q) => {
    const regex = new RegExp(q, "i");
    try {
        await dbConnect()
        const admins = await Admin.find({ username: { $regex: regex } });
        // if (!admin) {
        //     throw new Error("Admin not found");
        // }
        return admins;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch admin");
    }
}
export const fetchGames = async () => {
    try {
        await dbConnect()
        const games = await Games.find();
        return games
    } catch (error) {
        console.log(error);
    } throw new Error("Failed to fetch Game")
}
export const fetchGamesRate = async (nr) => {
    try {
        await dbConnect()
        // eslint-disable-next-line no-dupe-keys
        let test = await Games.find().sort({ count: -1 });
        const rateGames = [];
        rateGames.push(test[nr.nr - 1]);
        return rateGames
    } catch (error) {
        console.log(error);
    } throw new Error("Failed to fetch Game")
}
export const fetchUser = async () => {
    try {
        await dbConnect()
        const Users = await User.find();
        return Users
    } catch (error) {
        console.log(error);
    } throw new Error("Failed to fetch Game")
}