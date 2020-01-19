const express = require('express')
const cookieParser = require('cookie-parser')
const colors = require('colors')
require('dotenv').config()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

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

// app.use(
//     jwt({
//         secret: 'dummy'
//     }).unless({
//         path: ['/api/auth/login', '/api/auth/login-user', '/api/auth/login-resume']
//     })
// )

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

// module.exports = function(req, res, next) {
// 	console.log('req.headers.authorization from /api/index: ', req.headers.authorization)
// }
