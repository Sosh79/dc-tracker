"use server";
const dotEnv = require("dotenv");
dotEnv.config();
import { Server } from "./models";
import { dbConnect } from "./dbConnect";

export const addMessage = async (formData) => {
    const { id, message, guildId, channelId } = Object.fromEntries(formData);
    try {
        await dbConnect();
        const updatedWord = { guildId, channelId };
        Object.keys(updatedWord).forEach((key) =>
            (updatedWord[key] === "" || updatedWord[key] === undefined) && delete updatedWord[key]
        );

        await Server.findByIdAndUpdate(id, updatedWord);

        const { Client, GatewayIntentBits } = require("discord.js");
        const client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });
        let x;
        client.on("ready", async () => {
            console.log(`✅ ${client.user.tag} is online`);
            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                return { message: " Guild not found " };
            }
            const specificChannel = guild.channels.cache.get(channelId);
            if (!specificChannel) {
                return { message: "Channel not found" };
            }
            if (specificChannel && specificChannel.isTextBased()) {
                try {
                    await specificChannel.send(message)
                    return { message: "Message sent successfully" };

                } catch (error) {
                    console.error(`Could not send message to ${specificChannel.name}:`, error);
                    throw new Error(`Could not send message to ${specificChannel.name}`);
                }
            }
        });

        await client.login(process.env.TOKEN_GHAT);

    } catch (error) {
        console.error("Failed to add Message:", error);
        return { message: "Failed to add Message" };
    }
};
