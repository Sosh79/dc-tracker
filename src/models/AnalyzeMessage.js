const dotEnv = require('dotenv');
dotEnv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// //------------------------------ SCHEMAS ----------------------------------
const Words = require('../schemas/GamesCollection') //Words Collection.
const User = require('../schemas/UserCollection') //Users Collection.
//------------------------------ FUNCTIONS ----------------------------------

//--------------- Find And Update Word ---------------
const findAndUpdateWord = async (name, value) => {
    const filter = { name: name };
    const update = value;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Words.findOneAndUpdate(filter, update, options);
};
const getIdValueWord = async (name) => {
    const word = await Words.findOne({ name: name });
    return word ? word : null;
};
//--------------- Find And Update User ---------------
const findAndUpdateUser = async (discordId, gameName, update) => {
    const filter = { discordId: discordId, "games.name": gameName };
    const options = { new: true };
    return await User.findOneAndUpdate(filter, update, options);
};

// Function to get user document from User collection
const getIdValueUser = async (discordId, gameName) => {
    return await User.findOne({ discordId: discordId, "games.name": gameName });
};
//------------------------------Analyze Message ----------------------------------
async function run(message) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello AI." }, { text: "If the message is positive, write positive. If the message is negative, write negative. If the message is not positive or negative, do not write anything." }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });
    const msg = message.content;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const text = response.text();
    return text;

}
// Analyze the sentiment and categorize the message
const AnalyzeMessageWord = async (message, name) => {
    const text = await run(message);
    const textResult = text.trim()
    // console.log(textResult);
    let updateValue = null;

    if (textResult === "positive") {
        updateValue = { $inc: { Positive: 1 } };
        console.log('Positive message');
    } else if (textResult === "negative") {
        updateValue = { $inc: { Negative: 1 } };;
        console.log('Negative message');

    } else {
        console.log('Neutral message');
    }
    if (updateValue) {

        const currentWord = await getIdValueWord(name);
        if (currentWord === null) {
            console.log(`No Value Found For ${name}`);
            return;
        }
        console.log(`Current ${name}:`, "Positive", currentWord.Positive, "Negative", currentWord.Negative);
        const updatedWord = await findAndUpdateWord(name, updateValue);
        const Positive = updatedWord.Positive
        const Negative = updatedWord.Negative
        console.log(`Updated ${name}:`, Positive || Negative);
    }
};
// ----------------- Analyze Message User -------------------
const AnalyzeMessageUser = async (message, gameName) => {
    const text = await run(message);
    const textResult = text.trim()
    const discordId = message.author.id;
    let updateValue = null;
    let updateMessageValue = null;
    if (textResult === "positive") {
        updateValue = { $inc: { "games.$.Positive": 1 } };
        updateMessageValue = { $push: { "games.$.PositiveMessage": message.content } };
        console.log('positive message');
    } else if (textResult === "negative") {
        updateValue = { $inc: { "games.$.Negative": 1 } };
        updateMessageValue = { $push: { "games.$.NegativeMessage": message.content } };
        console.log('negative message');
    } else {
        console.log('Neutral message');
    }
    if (updateValue) {
        const currentUser = await getIdValueUser(discordId, gameName);
        if (currentUser === null) {
            console.log(`No Value Found For User ${message.author.username} in game ${gameName}`);
            return;
        }
        const updatedUser = await findAndUpdateUser(discordId, gameName, updateValue);

        if (updateMessageValue) {
            const updatedMessageUser = await findAndUpdateUser(discordId, gameName, updateMessageValue);
        }
    }
};
module.exports = {
    AnalyzeMessageWord: AnalyzeMessageWord,
    AnalyzeMessageUser: AnalyzeMessageUser,
}


