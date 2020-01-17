const express = require('express')
// const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const colors = require('colors')
require('dotenv').config()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error');

console.log('Call to api/index.js')

// Connect to mongoDB database
connectDB()

// Create app
const app = express()

// Install middleware
app.use(cookieParser())

// Body parser
// app.use(bodyParser.json())
app.use(express.json())

// Route files
const auth = require('./routes/auth')
app.use('/auth', auth)

const users = require('./routes/users')
app.use('/users', users)
// app.use(auth)

const resumes = require('./routes/resumes')
app.use('/resumes', resumes)

// Errors middleware
app.use(errorHandler)

// Export app
module.exports = {
  	path: '/api',
  	handler: app
}