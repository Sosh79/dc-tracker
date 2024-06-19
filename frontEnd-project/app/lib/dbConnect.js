const dotEnv = require('dotenv')
dotEnv.config()
import mongoose from 'mongoose'

export const dbConnect = async () => {
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