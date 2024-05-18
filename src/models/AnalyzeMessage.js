const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
// Create a new instance of SentimentAnalyzer
const analyzer = new Analyzer('English', stemmer, 'afinn');
//------------------------------ MODELS ----------------------------------
const Insert = require('./insertData') //Insert Data.
// //------------------------------ SCHEMAS ----------------------------------
const Words = require('../schemas/WordsCollection') //Words Collection.
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
// Define custom thresholds for sentiment categories
const THRESHOLDS = {
    significantlyPositive: 1.0,
    significantlyNegative: -1.0,
};
// Function to analyze the sentiment of a message
const analyzeSentiment = (message) => {
    const tokens = tokenizer.tokenize(message);
    const score = analyzer.getSentiment(tokens);
    if (score >= THRESHOLDS.significantlyPositive) {
        return 'significantly positive';
    } else if (score <= THRESHOLDS.significantlyNegative) {
        return 'significantly negative';
    } else {
        return 'neutral';
    }
};

// Analyze the sentiment and categorize the message
const AnalyzeMessageWord = async (message, name) => {
    let updateValue = null;
    const sentimentCategory = analyzeSentiment(message.content);
    if (sentimentCategory === 'significantly positive') {
        updateValue = { $inc: { Positive: 1 } };
        console.log('Significantly positive message:', message.content);
    } else if (sentimentCategory === 'significantly negative') {
        updateValue = { $inc: { Negative: 1 } };;
        console.log('Significantly negative message:', message.content);
    } else {
        console.log('Neutral message:', message.content);
    }
    if (updateValue) {
        const currentWord = await getIdValueWord(name);
        if (currentWord === null) {
            console.log(`No Value Found For ${name}`);
            return;
        }
        console.log(`Current ${name}:`, currentWord.Positive || currentWord.Negative);
        const updatedWord = await findAndUpdateWord(name, updateValue);
        const Positive = updatedWord.Positive
        const Negative = updatedWord.Negative
        console.log(`Updated ${name}:`, Positive || Negative);
    }
}; // ----------------- Analyze Message User -------------------
const AnalyzeMessageUser = async (message, gameName) => {
    const discordId = message.author.id;
    const sentimentCategory = analyzeSentiment(message.content);
    let updateValue = null;
    let updateMessageValue = null;
    if (sentimentCategory === 'significantly positive') {
        updateValue = { $inc: { "games.$.Positive": 1 } };
        updateMessageValue = { $push: { "games.$.PositiveMessage": message.content } };
        console.log('Significantly positive message:', message.content);
    } else if (sentimentCategory === 'significantly negative') {
        updateValue = { $inc: { "games.$.Negative": 1 } };
        updateMessageValue = { $push: { "games.$.NegativeMessage": message.content } };
        console.log('Significantly negative message:', message.content);
    } else {
        console.log('Neutral message:', message.content);
    }
    if (updateValue) {
        const currentUser = await getIdValueUser(discordId, gameName);
        if (currentUser === null) {
            console.log(`No Value Found For User ${message.author.username} in game ${gameName}`);
            return;
        }

        console.log(`Current ${gameName}: Positive: ${currentUser.games.find(game => game.name === gameName).Positive}, Negative: ${currentUser.games.find(game => game.name === gameName).Negative}`);
        const updatedUser = await findAndUpdateUser(discordId, gameName, updateValue);
        console.log(`Updated ${gameName}: Positive: ${updatedUser.games.find(game => game.name === gameName).Positive}, Negative: ${updatedUser.games.find(game => game.name === gameName).Negative}`);

        if (updateMessageValue) {
            const updatedMessageUser = await findAndUpdateUser(discordId, gameName, updateMessageValue);
            console.log(`Updated ${gameName}: PositiveMessage: ${updatedMessageUser.games.find(game => game.name === gameName).PositiveMessage}, NegativeMessage: ${updatedMessageUser.games.find(game => game.name === gameName).NegativeMessage}`);
        }
    }
};
module.exports = {
    AnalyzeMessageWord: AnalyzeMessageWord,
    AnalyzeMessageUser: AnalyzeMessageUser,
}


