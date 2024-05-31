//------------------------------ SCHEMAS ----------------------------------
const { Games, User } = require('../schemas')

// ------------ MODELS ----------------------
const Analyze = require('./AnalyzeMessage')
const Insert = require('./insertData')
// ------------ FUNCTIONS ----------------------
const findAndUpdateWord = async (name, count) => {
    const filter = { name: name };
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Games.findOneAndUpdate(filter, update, options);
};
const getIdCountWord = async (name) => {
    const word = await Games.findOne({ name: name });
    return word ? word.count : null;
};
// ------------------------------------------------ EXPORTS ------------------------------------------------
//----------------- Find And Update GameName --------------------
const word = async (count, message, GameName) => {
    const name = GameName;
    await Insert.insertDocWord(GameName);
    await Analyze.AnalyzeMessageWord(message, name);
    const currentCount = await getIdCountWord(name);
    if (currentCount === null) {
        console.log(`No Document Found For ${name}`);
        return null;
    }
    console.log('Current count:', currentCount);
    const updatedWord = await findAndUpdateWord(name, count + currentCount);
    console.log(`GameName with ID ${name} updated successfully.`);
    await updatedWord.save();
}
//----------------- Find And Update User --------------------
const user = async (count, message, GameName) => {
    try {
        const user = await User.findOne({ discordId: message.author.id });
        if (user) {
            const game = user.games.find(game => game.name === GameName);
            if (game) {
                game.count = (parseInt(game.count) + count).toString();
            } else {
                user.games.push({ name: GameName, count: count.toString(), Positive: "0", Negative: "0", PositiveMessage: [], NegativeMessage: [] });
            }
            await user.save();
            await Analyze.AnalyzeMessageUser(message, GameName)
            console.log(`User ${message.author.username}'s data updated successfully`);
        } else {
            console.log('User not found');
        }
    } catch (err) {
        console.error('Error updating user:', err);
    }
};
module.exports = {
    word: word,
    user: user,
};