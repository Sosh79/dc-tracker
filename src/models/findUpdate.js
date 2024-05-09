// ------------ MODELS ----------------------
const Words = require('./wordsCollection') //words Collection.

// ------------ FUNCTIONS ----------------------
const hello = async (count) => {
    const filter = { _id: '663b7179159ae8b14b7c7ce3' }; // Hello ID
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const doc = await Words.findOneAndUpdate(filter, update, options);
    console.log(`Hello ID`);
    count = await doc.save()
    return count;
}
const hi = async (count) => {
    const filter = { _id: '663b86f380ab9af0e9bbf47c' }; // Hi ID
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const doc = await Words.findOneAndUpdate(filter, update, options);
    console.log(`Hi ID`);
    count = await doc.save()
    return count;
}
const lol = async (count) => {
    const filter = { _id: '663b86a7f955b5602e3132f3' }; // LOL ID
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const doc = await Words.findOneAndUpdate(filter, update, options);
    console.log(`LOL ID`);
    count = await doc.save()
    return count;
}
module.exports = {
    hello: hello,
    hi: hi,
    lol: lol,
};