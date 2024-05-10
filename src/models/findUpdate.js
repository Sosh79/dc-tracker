// ------------ MODELS ----------------------
const Words = require('./wordsCollection') //words Collection.

// ------------ FUNCTIONS ----------------------
const findAndUpdateWord = async (id, count) => {
    const filter = { _id: id };
    const update = { count: count };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    return await Words.findOneAndUpdate(filter, update, options);
};
const getIdCount = async (id) => {
    const word = await Words.findOne({ _id: id });
    return word ? word.count : null;
};

// ------------ EXPORTS ----------------------
const hello = async (count) => {
    const id = '663b7179159ae8b14b7c7ce3';
    const currentCount = await getIdCount(id);
    if (currentCount === null) {
        console.log('No document found for hello');
        return null;
    }
    console.log('Current count:', currentCount); //Current count
    const updatedWord = await findAndUpdateWord(id, count + currentCount);
    console.log(`Word with ID ${id} updated successfully.`);
    await updatedWord.save();
    return updatedWord.count
}
const hi = async (count) => {
    const id = '663b86f380ab9af0e9bbf47c';
    const currentCount = await getIdCount(id);
    if (currentCount === null) {
        console.log('No document found for hello');
        return null;
    }
    console.log('Current count:', currentCount); //Current count
    const updatedWord = await findAndUpdateWord(id, count + currentCount);
    console.log(`Word with ID ${id} updated successfully.`);
    await updatedWord.save();
    return updatedWord.count
}
const lol = async (count) => {
    const id = '663b86a7f955b5602e3132f3';
    const currentCount = await getIdCount(id);
    if (currentCount === null) {
        console.log('No document found for hello');
        return null;
    }
    console.log('Current count:', currentCount); //Current count
    const updatedWord = await findAndUpdateWord(id, count + currentCount);
    console.log(`Word with ID ${id} updated successfully.`);
    await updatedWord.save();
    return updatedWord.count
}
module.exports = {
    hello: hello,
    hi: hi,
    lol: lol,
};