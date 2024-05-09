const express = require('express') // express
const app = express() // express
const cors = require('cors') // cors
const dotEnv = require('dotenv') //dotenv
dotEnv.config() //dotenv
const mongoose = require('mongoose') // mongoose
// ------------ Mongoose Connect ----------------------
mongoose.connect(process.env.CONNECT)
    .then(() => {
        console.log('successfully connected to DB');
    })
    .catch((err) => {
        console.log("error with connected to DB", err);
    })
// ------------ MODELS ----------------------
const words = require('./models/cwf') //words Collection.
// ------------ Server Start ----------------------
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {  // Home page Start
    res.send('Home page')
})

// ------------ Words Start ----------------------
app.get('/words', async (req, res) => {
    try {
        const findWords = await words.find()
        res.json(findWords)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Not Found' })//Error 404
    }
})
app.post('/words', async (req, res) => {
    try {
        const word = new words()
        word.name = req.body.name
        word.message = req.body.message
        word.count = req.body.count
        await word.save()
        res.send(word)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Not Found' })//Error 404
    }
})
app.listen(process.env.PORT, () => { // Server Port
    console.log(`Server is running on port ${process.env.PORT}`);
})
// module.exports = {
//     gWords: gWords,
//     pWords: pWords,
// }
