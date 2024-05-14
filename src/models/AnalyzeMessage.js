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
const findAndUpdateUser = async (name, username, value) => {
    const filter = { username: username, name: name };
    const update = value;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await User.findOneAndUpdate(filter, update, options);
};
const getIdValueUser = async (name, username) => {
    const word = await User.findOne({ username: username, name: name });
    return word ? word : null;
};
//------------------------------Analyze Message ----------------------------------
// Define custom thresholds for sentiment categories
const THRESHOLDS = {
    significantlyPositive: 0.5,
    moderatelyPositive: 0.2,
    moderatelyNegative: -0.2,
    significantlyNegative: -0.5,
};
// Function to analyze the sentiment of a message
const analyzeSentiment = (message) => {
    const tokens = tokenizer.tokenize(message);
    const score = analyzer.getSentiment(tokens);
    if (score >= THRESHOLDS.significantlyPositive) {
        return 'significantly positive';
    } else if (score >= THRESHOLDS.moderatelyPositive) {
        return 'moderately positive';
    } else if (score <= THRESHOLDS.significantlyNegative) {
        return 'significantly negative';
    } else if (score <= THRESHOLDS.moderatelyNegative) {
        return 'moderately negative';
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
    } else if (sentimentCategory === 'moderately positive') {
        console.log('Moderately positive message:', message.content);
    } else if (sentimentCategory === 'significantly negative') {
        updateValue = { $inc: { Negative: -1 } };;
        console.log('Significantly negative message:', message.content);
    } else if (sentimentCategory === 'moderately negative') {
        console.log('Moderately negative message:', message.content);
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
const AnalyzeMessageUser = async (message, name) => {
    let updateMessageValue = null;
    let updateValue = null;
    const username = message.author.username
    const sentimentCategory = analyzeSentiment(message.content);
    if (sentimentCategory === 'significantly positive') {
        updateValue = { $inc: { Positive: 1 } };
        updateMessageValue = { $push: { PositiveMessage: message.content } }; // Adjusted to use $push
        console.log('Significantly positive message:', message.content);
    } else if (sentimentCategory === 'moderately positive') {
        console.log('Moderately positive message:', message.content);
    } else if (sentimentCategory === 'significantly negative') {
        updateValue = { $inc: { Negative: -1 } };
        updateMessageValue = { $push: { NegativeMessage: message.content } }; // Adjusted to use $push
        console.log('Significantly negative message:', message.content);
    } else if (sentimentCategory === 'moderately negative') {
        console.log('Moderately negative message:', message.content);
    } else {
        console.log('Neutral message:', message.content);
    }
    if (updateValue) {
        const currentWord = await getIdValueUser(name, username);
        if (currentWord === null) {
            console.log(`No Value Found For updateValue ${name}`);
            return;
        }
        //---------------- Updated Word -----------------
        console.log(`Current ${name}:`, currentWord.Positive || currentWord.Negative);
        const updatedWord = await findAndUpdateUser(name, username, updateValue);
        const Positive = updatedWord.Positive
        const Negative = updatedWord.Negative
        console.log(`Updated ${name}:`, Positive || Negative);
        //---------------- Updated Message -----------------
        if (updateMessageValue) {
            const currentWord = await getIdValueUser(name, username);
            if (currentWord === null) {
                console.log(`No Value Found For in ${name}`);
                return;
            }
        }
        console.log(`Current ${name}:`, "PositiveMessage", currentWord.PositiveMessage, "NegativeMessage", currentWord.NegativeMessage);
        const updatedMessage = await findAndUpdateUser(name, username, updateMessageValue);
        const PositiveMessage = updatedMessage.PositiveMessage
        const NegativeMessage = updatedMessage.NegativeMessage
        console.log(`Updated ${name}:`, "PositiveMessage", PositiveMessage, "NegativeMessage", NegativeMessage);



    }
};
module.exports = {
    AnalyzeMessageWord: AnalyzeMessageWord,
    AnalyzeMessageUser: AnalyzeMessageUser,
}


