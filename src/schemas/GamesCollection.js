const mongoose = require('mongoose')
const schema = mongoose.Schema
const gameWord = new schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
})
const Games = mongoose.models.Games || mongoose.model('Games', gameWord)

module.exports = Games