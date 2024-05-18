const Words = require('../schemas/WordsCollection') //Words Collection.
const User = require('../schemas/UserCollection') //Users Collection.

// --------------------------------- Insert All Data --------------------------------------------



//---------- USERS INSERT --------------

const insertDocUser = async (message, wordsToAudit) => {
    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ discordId: message.author.id });

        if (existingUser) {
            console.log('User already exists in the database');
            return existingUser; // Return the existing user document
        }
        const newUser = new User({
            username: message.author.username,
            discordId: message.author.id,
            games: [
                { name: wordsToAudit[0], count: "0", Positive: "0", Negative: "0", PositiveMessage: [], NegativeMessage: [] },
                { name: wordsToAudit[1], count: "0", Positive: "0", Negative: "0", PositiveMessage: [], NegativeMessage: [] },
                { name: wordsToAudit[2], count: "0", Positive: "0", Negative: "0", PositiveMessage: [], NegativeMessage: [] }
            ]
        });
        await newUser.save();
        console.log('User saved successfully');
    } catch (err) {
        console.error('Error saving user:', err);
    }
};


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