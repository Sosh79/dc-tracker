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
    avatar: String,
    games: [GameSchema],
}, {
    timestamps: true,
}
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
