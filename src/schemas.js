const mongoose = require('mongoose');

const WordNameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true,
}
)

const gameWord = new mongoose.Schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
})

const GameSchema = new mongoose.Schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
    PositiveMessage: [String],
    NegativeMessage: [String]
});

const UserSchema = new mongoose.Schema({
    username: String,
    discordId: String,
    avatar: String,
    games: [GameSchema],
}, {
    timestamps: true,
}
);
const Words = mongoose.models.Words || mongoose.model("Words", WordNameSchema);
const Games = mongoose.models.Games || mongoose.model('Games', gameWord)
const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = {
    Words: Words,
    Games: Games,
    User: User,
};


