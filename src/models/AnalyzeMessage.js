const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
// Create a new instance of SentimentAnalyzer
const analyzer = new Analyzer('English', stemmer, 'afinn');
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
const AnalyzeMessage = async (message) => {
    const sentimentCategory = analyzeSentiment(message.content);
    if (sentimentCategory === 'significantly positive') {
        console.log('Significantly positive message:', message.content);
    } else if (sentimentCategory === 'moderately positive') {
        console.log('Moderately positive message:', message.content);
    } else if (sentimentCategory === 'significantly negative') {
        console.log('Significantly negative message:', message.content);
    } else if (sentimentCategory === 'moderately negative') {
        console.log('Moderately negative message:', message.content);
    } else {
        console.log('Neutral message:', message.content);
    }
    return
};
module.exports = {
    AnalyzeMessage: AnalyzeMessage
}


