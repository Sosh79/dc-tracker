const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
    PositiveMessage: [String],
    NegativeMessage: [String]
});

const UserSchema = new Schema({
    username: String,
    discordId: String,
    games: [GameSchema]
});

module.exports = mongoose.model('User', UserSchema);
