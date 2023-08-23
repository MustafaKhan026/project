const mongoose = require('mongoose')
require('dotenv').config()
require('express-async-errors')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI).then(console.log("MongoDB connected!"))
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB