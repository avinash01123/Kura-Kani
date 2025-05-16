require('dotenv').config()
const express = require('express')
const authRoutes = require('./routes/auth.route')
const connectMongo = require('./lib/db')

const app = express()
const PORT = process.env.PORT

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  connectMongo()
})