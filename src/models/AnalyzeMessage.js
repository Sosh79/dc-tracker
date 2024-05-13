const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
// Create a new instance of SentimentAnalyzer
const analyzer = new Analyzer('English', stemmer, 'afinn');
//------------------------------ MODELS ----------------------------------
const Words = require('../schemas/WordsCollection') //words Collection.
//------------------------------ FUNCTIONS ----------------------------------
const findAndUpdate = async (name, value) => {
    const filter = { name: name };
    const update = value;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Words.findOneAndUpdate(filter, update, options);
};

// Find specific ID and get the values saved in DB
const getIdValue = async (name) => {
    const word = await Words.findOne({ name: name });
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
const AnalyzeMessage = async (message, name) => {
    let updateValue = null;
    const sentimentCategory = analyzeSentiment(message.content);
    if (sentimentCategory === 'significantly positive') {
        updateValue = { $inc: { Positive: 1 } };
        console.log('Significantly positive message:', message.content);
    } else if (sentimentCategory === 'moderately positive') {
        console.log('Moderately positive message:', message.content);
    } else if (sentimentCategory === 'significantly negative') {
        updateValue = { $inc: { Negative: 1 } };;
        console.log('Significantly negative message:', message.content);
    } else if (sentimentCategory === 'moderately negative') {
        console.log('Moderately negative message:', message.content);
    } else {
        console.log('Neutral message:', message.content);
    }
    if (updateValue) {
        const currentWord = await getIdValue(name);
        if (currentWord === null) {
            console.log(`No Value Found For ${name}`);
            return;
        }
        console.log(`Current ${name}:`, currentWord.Positive || currentWord.Negative);
        const updatedWord = await findAndUpdate(name, updateValue);
        console.log(`Updated ${name}:`, updatedWord.Positive || updatedWord.Negative);
    }

};
module.exports = {
    AnalyzeMessage: AnalyzeMessage
}


