"use server"
const dotEnv = require("dotenv");
dotEnv.config();
export const addMessage = async (formData) => {
    const { message } = Object.fromEntries(formData);
    try {


        const { Client, GatewayIntentBits } = require("discord.js");
        const client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        });
        client.on("ready", async (ready) => {
            console.log(`✅ .${ready.user.tag} is online`); // bot is online or offline
            const guildId = '1237029023654215751';
            const specificChannelId = '1247867293199896628';
            await sendMessageToChannels(guildId, specificChannelId, message);
        });

        client.login(process.env.TOKEN_GHAT);
        const sendMessageToChannels = async (guildId, specificChannelId, messageContent) => {
            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                console.error("Guild not found!");
                return;
            }
            const specificChannel = guild.channels.cache.get(specificChannelId);
            if (specificChannel && specificChannel.isTextBased()) {
                try {
                    await specificChannel.send(messageContent);
                } catch (error) {
                    console.error(`Could not send message to ${specificChannel.name}:`, error);
                }
            } else {
                console.error("Specific channel not found or is not a text channel!");
            }
        }


    } catch (error) {
        console.log("Failed to add Message");
    }

    // module.exports = { sendMessageToChannels };
}