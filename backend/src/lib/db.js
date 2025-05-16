const mongoose = require('mongoose')
const { MONGODB_URI } = process.env

const connectMongo = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI)
    console.log('MongoDB Connected!')
  } catch (error) {
    console.log('MongoDB connection error:', error)
  }
}

module.exports = connectMongo