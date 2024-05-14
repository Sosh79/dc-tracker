const mongoose = require('mongoose')
const schema = mongoose.Schema
const UserSchema = new schema({
    username: String,
    spotify: String,
    avatar: String,
    discordId: {
        type: String,
        required: true,
    },
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
    PositiveMessage: [{
        type: String,
        required: true,
    }],
    NegativeMessage: [{
        type: String,
        required: true,
    }],
    // messages: [{
    //     type: String,
    //     required: true,
    // }]


})
const user = mongoose.model('User', UserSchema)

module.exports = user