const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: mongoose.SchemaTypes.String,
    discordId: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    name: mongoose.SchemaTypes.String,
    count: mongoose.SchemaTypes.Number,
    Positive: mongoose.SchemaTypes.Number,
    Negative: mongoose.SchemaTypes.Number,
})
const user = mongoose.model('User', UserSchema)
module.exports = user