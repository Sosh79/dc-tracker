const { TextInputStyle } = require('discord.js');
const mongoose = require('mongoose')
const schema = mongoose.Schema
const CalculateWord = new schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
    // message: String,
})
const Words = mongoose.model('Words', CalculateWord)

// --------------------------------- Insert All Data --------------------------------------------

const insertDocHello = async () => {
    try {
        const id = '663b7179159ae8b14b7c7ce3';
        // Searches for the document using the given ID
        let word = await Words.findOne({ _id: id });
        // If the document is not found, a new document is created
        if (!word) {
            word = new Words({
                _id: id,
                name: "hello",
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
insertDocHello();

const insertDocHi = async () => {
    try {
        const id = '663b86f380ab9af0e9bbf47c';
        // Searches for the document using the given ID
        let word = await Words.findOne({ _id: id });
        // If the document is not found, a new document is created
        if (!word) {
            word = new Words({
                _id: id,
                name: "hi",
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
insertDocHi();

const insertDocLol = async () => {
    try {
        const id = '663b86a7f955b5602e3132f3';
        // Searches for the document using the given ID
        let word = await Words.findOne({ _id: id });
        // If the document is not found, a new document is created
        if (!word) {
            word = new Words({
                _id: id,
                name: "lol",
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
insertDocLol();
module.exports = Words