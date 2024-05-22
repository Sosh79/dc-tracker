import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 50,
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
}, {
    timestamps: true,
}
)
const gameWord = mongoose.Schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
})
const GameSchema = mongoose.Schema({
    name: String,
    count: Number,
    Positive: Number,
    Negative: Number,
    PositiveMessage: [String],
    NegativeMessage: [String]
});

const UserSchema = mongoose.Schema({
    username: String,
    discordId: String,
    games: [GameSchema]
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Games = mongoose.models.Games || mongoose.model('Games', gameWord)
export const Admin = mongoose.models.Admins || mongoose.model("Admins", adminSchema);
