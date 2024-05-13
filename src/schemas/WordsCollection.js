// const { TextInputStyle } = require('discord.js');
const mongoose = require('mongoose')
const schema = mongoose.Schema
const CalculateWord = new schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
})
const Words = mongoose.model('Words', CalculateWord)

module.exports = Words