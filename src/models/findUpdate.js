//------------------------------ SCHEMAS ----------------------------------
const User = require('../schemas/UserCollection') //Users Collection.
const Words = require('../schemas/WordsCollection') //Words Collection.
// ------------ MODELS ----------------------
const Analyze = require('./AnalyzeMessage') //Analyze Message.
const Insert = require('./insertData') //Insert Data.
// ------------ FUNCTIONS ----------------------
const findAndUpdateWord = async (name, count) => {
    const filter = { name: name };
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Words.findOneAndUpdate(filter, update, options);
};
const getIdCountWord = async (name) => {
    const word = await Words.findOne({ name: name });
    return word ? word.count : null;
};
const findAndUpdateUser = async (name, username, count) => {
    const filter = { username: username, name: name };
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await User.findOneAndUpdate(filter, update, options);
};
const getIdCountUser = async (name, username) => {
    const word = await User.findOne({ username: username, name: name });
    return word ? word.count : null;
};
// ------------------------------------------------ EXPORTS ------------------------------------------------
//----------------- Find And Update Word --------------------
const word = async (count, message, wordToAudit) => {
    const name = wordToAudit;
    await Insert.insertDocWord(wordToAudit);
    await Analyze.AnalyzeMessageWord(message, name); //Analyze The Message
    const currentCount = await getIdCountWord(name);
    if (currentCount === null) {
        console.log(`No Document Found For ${name}`);
        return null;
    }
    console.log('Current count:', currentCount); //Current count
    const updatedWord = await findAndUpdateWord(name, count + currentCount);
    console.log(`Word with ID ${name} updated successfully.`);
    await updatedWord.save();
}
//----------------- Find And Update User --------------------
const user = async (count, message, wordToAudit) => {
    const name = wordToAudit;
    const username = message.author.username;
    await Insert.insertDocUser(message, wordToAudit);
    await Analyze.AnalyzeMessageUser(message, name); //Analyze The Message
    const currentCount = await getIdCountUser(name, username);
    if (currentCount === null) {
        console.log(`No Document Found For findUpdate.js ${name}`);
        return null;
    }
    console.log('Current count:', currentCount); //Current count
    const updatedUser = await findAndUpdateUser(name, username, count + currentCount);
    console.log(`User with ID ${message.author.username} updated successfully.`);
    await updatedUser.save();
}

module.exports = {
    word: word,
    user: user,
};