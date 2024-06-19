const dotEnv = require('dotenv')
dotEnv.config()
const { Client, IntentsBitField } = require('discord.js')
const connectDB = require('./connectDB.js')
connectDB()
const { Words } = require('./schemas.js')
const { fetchWord } = require('./data.js')

// ------------ MODELS ----------------------
const findUpdate = require('./models/findUpdate.js')
const Insert = require('./models/insertData.js')
// ------------ Discord.js ---------------------
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})
client.on('ready', (ready) => {
    console.log(`✅ .${ready.user.tag} is online`) // bot is online or offline
})
client.on('messageCreate', async (message) => {
    if (message.author.bot) { // 
        return;
    }
    const GamesName = await fetchWord();
    await Insert.insertDocUser(message, GamesName);

    GamesName.forEach(async GameName => {
        if (message.content.toLowerCase().includes(GameName.toLowerCase())) {
            const regex = new RegExp(`\\b${GameName}\\b`, 'gi');
            const matches = message.content.match(regex);
            const count = matches ? matches.length : 0;
            await findUpdate.word(count, message, GameName)
            await findUpdate.user(count, message, GameName)

            console.log(`Number of times "${GameName}" mentioned: ${count}`);
        }
    });

});
client.login(process.env.TOKEN)