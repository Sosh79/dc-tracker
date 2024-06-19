const dotEnv = require('dotenv')
dotEnv.config()
const mongoose = require('mongoose')

const connectDB = async () => {
    const connection = {}
    try {
        if (connection.isConnected) {
            return
        }
        const db = await mongoose.connect(process.env.CONNECT)
        connection.isConnected = db.connections[0].readyState
    } catch (error) {
        throw new Error(error)
    }
}
module.exports = connectDB