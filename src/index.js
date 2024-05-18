const dotEnv = require('dotenv')
dotEnv.config()
const { Client, IntentsBitField } = require('discord.js')
const mongoose = require('mongoose') // mongoose
// ------------ Mongoose Connect ----------------------
mongoose.connect(process.env.CONNECT)
    .then(() => {
        console.log('successfully connected to DB');
    })
    .catch((err) => {
        console.log("error with connected to DB", err);
    })
// ------------ MODELS ----------------------
const findUpdate = require('./models/findUpdate') //findUpdate.
const Analyze = require('./models/AnalyzeMessage') //Analyze Message.
const Insert = require('./models/insertData') //Insert Data.
// ------------ SCHEMAS ----------------------
const Words = require('./schemas/WordsCollection') //Words Collection.
const User = require('./schemas/UserCollection') //User Collection.

// ------------ Discord.js ----------------------
const client = new Client({
    intents: [ // It is a set of permissions that a robot can use
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

    // Specified words to audit
    const wordsToAudit = ['hello', 'hi', 'lol'];
    await Insert.insertDocUser(message, wordsToAudit);

    // Iterate over each specified word
    wordsToAudit.forEach(async wordToAudit => {
        // Check if the message contains the specified word
        if (message.content.toLowerCase().includes(wordToAudit.toLowerCase())) {
            // Extract only the specified word from the message
            const regex = new RegExp(`\\b${wordToAudit}\\b`, 'gi');
            const matches = message.content.match(regex);
            const count = matches ? matches.length : 0; // Count the number of times
            await findUpdate.word(count, message, wordToAudit)
            await findUpdate.user(count, message, wordToAudit)

            console.log(`Number of times "${wordToAudit}" mentioned: ${count}`);
        }
    });

});
client.login(process.env.TOKEN)