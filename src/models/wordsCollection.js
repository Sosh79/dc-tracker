const mongoose = require('mongoose')
const schema = mongoose.Schema
const CalculateWord = new schema({
    name: String,
    count: Number,
    // message: String,
})
const Words = mongoose.model('Words', CalculateWord)

// --------------------------------- Insert All Data --------------------------------------------





// ------------ insertDocHello ----------------------

// const insertDocHello = async () => {
//     const word = Words({
//         name: "hello",
//         count: " ",
//     })
//     const doc = await word.save()
// }
// insertDocHello();
// ------------ insertDocHi ----------------------
// const insertDocHi = async () => {
//     const word = Words({
//         name: "hi",
//         count: " ",
//     })
//     const doc = await word.save()
// }
// insertDocHi();
// ------------ insertDocLOL ----------------------
// const insertDocLol = async () => {
//     const word = Words({
//         name: "lol",
//         count: " ",
//     })
//     const doc = await word.save()
// }
// insertDocLol();
module.exports = Words