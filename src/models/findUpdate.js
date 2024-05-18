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
    try {
        const user = await User.findOne({ discordId: message.author.id });
        if (user) {
            const game = user.games.find(game => game.name === wordToAudit);
            if (game) {
                game.count = (parseInt(game.count) + count).toString();
            } else {
                user.games.push({ name: wordToAudit, count: count.toString() });
            }
            await Analyze.AnalyzeMessageUser(message, wordToAudit)

            await user.save();
            console.log(`User ${message.author.username}'s data updated successfully`);
        } else {
            console.log('User not found');
        }
    } catch (err) {
        console.error('Error updating user:', err);
    }
};
// user: async (count, message, wordToAudit) => {
//     // Implement any additional user-specific updates if needed
// }


module.exports = {
    word: word,
    user: user,
};