require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectMongo = require('./lib/db')
const cors = require('cors')
const express = require('express')
const authRoutes = require('./routes/auth.route')
const messageRoutes = require('./routes/message.route')

const app = express()
const PORT = process.env.PORT

app.use(express.json({limit: '10mb'}))
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
  connectMongo()
})