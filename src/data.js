const connectDB = require('./connectDB')
const { Words } = require('./schemas');
const fetchWord = async () => {
    try {
        await connectDB()
        const words = await Words.find({}, { name: 1, _id: 0 });
        return words.map(word => word.name);
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch Word");
    }
}
module.exports = {
    fetchWord: fetchWord
};
