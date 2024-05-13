const Words = require('../schemas/WordsCollection') //Words Collection.
const User = require('../schemas/UserCollection') //Users Collection.

// --------------------------------- Insert All Data --------------------------------------------



//---------- USERS INSERT --------------

const insertDocUser = async (message, wordToAudit, count, Positive, Negative) => {
    try {
        const username = message.author.username
        let user = await User.findOne({ username: username });
        if (!user) {
            const user = await User.create({
                username: message.author.username,
                discordId: message.author.id,
                name: wordToAudit,
                count: count,
                Positive: Positive,
                Negative: Negative,
            });
        }
        // await word.save();
    } catch (error) {
        console.log(error);
    }
}
// insertDocUser();


// ---------------- WORDS INSERT ----------------
const insertDocWord = async (wordToAudit) => {
    try {
        const name = wordToAudit;
        // Searches for the document using the given ID
        let word = await Words.findOne({ name: name });
        // If the document is not found, a new document is created
        if (!word) {
            word = new Words({
                name: wordToAudit,
                count: " ",
                Positive: " ",
                Negative: " ",
            });
        }
        await word.save();
    } catch (error) {
        console.log(error);
    }
};
// insertDocLol();
module.exports = {
    insertDocUser: insertDocUser,
    insertDocWord: insertDocWord

}