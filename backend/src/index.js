require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectMongo = require('./lib/db')
const express = require('express')
const authRoutes = require('./routes/auth.route')
const messageRoutes = require('./routes/message.route')

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  connectMongo()
})