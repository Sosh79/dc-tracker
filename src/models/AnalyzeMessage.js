const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
// Create a new instance of SentimentAnalyzer
const analyzer = new Analyzer('English', stemmer, 'afinn');
//------------------------------ MODELS ----------------------------------
const Words = require('./wordsCollection') //words Collection.
//------------------------------ FUNCTIONS ----------------------------------
// Function to find and update word count in DB
const findAndUpdatePositive = async (id, Positive) => {
    const filter = { _id: id };
    const update = { Positive: Positive };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Words.findOneAndUpdate(filter, update, options);
};
const findAndUpdateNegative = async (id, Negative) => {
    const filter = { _id: id };
    const update = { Negative: Negative };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Words.findOneAndUpdate(filter, update, options);
};
//Find specific ID.Get the values saved in DB.Positive and Negative.
const getIdPositive = async (id) => {
    const word = await Words.findOne({ _id: id });
    return word ? word.Positive : null;
};
const getIdNegative = async (id) => {
    const word = await Words.findOne({ _id: id });
    return word ? word.Negative : null;
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
const AnalyzeMessage = async (message, id) => {
    const sentimentCategory = analyzeSentiment(message.content);
    if (sentimentCategory === 'significantly positive') {
        const currentPositive = await getIdPositive(id);
        if (currentPositive === null) {
            console.log('No Value Found For Hello Positive ');
            return null;
        }
        console.log('Current Positive:', currentPositive); //Current Positive
        const updatedWord = await findAndUpdatePositive(id, 1 + currentPositive);
        await updatedWord.save();
        console.log('Significantly positive message:', message.content);
    } else if (sentimentCategory === 'moderately positive') {
        console.log('Moderately positive message:', message.content);
    } else if (sentimentCategory === 'significantly negative') {
        const currentNegative = await getIdNegative(id);
        if (currentNegative === null) {
            console.log('No Value Found For Hello Negative ');
            return null;
        }
        console.log('Current Negative:', currentNegative); //Current Negative
        const updatedWord = await findAndUpdateNegative(id, -1 + currentNegative);
        await updatedWord.save();
        console.log('Significantly negative message:', message.content);
    } else if (sentimentCategory === 'moderately negative') {
        console.log('Moderately negative message:', message.content);
    } else {
        console.log('Neutral message:', message.content);
    }
    return;
};
module.exports = {
    AnalyzeMessage: AnalyzeMessage
}


