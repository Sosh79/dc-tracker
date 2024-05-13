// ------------ MODELS ----------------------
const Words = require('../schemas/WordsCollection') //Words Collection.
const Analyze = require('./AnalyzeMessage') //Analyze Message.
const Insert = require('./insertData') //Insert Data.
// ------------ FUNCTIONS ----------------------
const findAndUpdateWord = async (name, count) => {
    const filter = { name: name };
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Words.findOneAndUpdate(filter, update, options);
};
const getIdCount = async (name) => {
    const word = await Words.findOne({ name: name });
    return word ? word.count : null;
};

// ------------ EXPORTS ----------------------
const word = async (count, message, wordToAudit) => {
    const name = wordToAudit;
    await Insert.insertDocWord(wordToAudit);
    await Analyze.AnalyzeMessage(message, name); //Analyze The Message
    const currentCount = await getIdCount(name);
    if (currentCount === null) {
        console.log(`No Document Found For ${name}`);
        return null;
    }
    console.log('Current count:', currentCount); //Current count
    const updatedWord = await findAndUpdateWord(name, count + currentCount);
    console.log(`Word with ID ${name} updated successfully.`);
    await Insert.insertDocUser(message, wordToAudit, count);
    await updatedWord.save();
}

module.exports = {
    word: word,
};