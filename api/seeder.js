const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')

// Load env vars
require('dotenv').config()

// Load models
const User = require('./models/User')
const Resume = require('./models/Resume')
const Template = require('./models/Template')

const fakeDataGenerator = require('./utils/fakeDataGenerator')
const templates = fakeDataGenerator.generateFakeTemplates(10)
// console.log('templates: ', templates)
const resumes = fakeDataGenerator.generateFakeResumes(10)
console.log('resumes: ', resumes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

// Read JSON files
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

// Import into DB
const importData = async () => {
    try {
        await User.create(users)
        await Resume.create(resumes)
        await Template.create(templates)
        console.log('Data Imported...'.green.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

// Delete data
const deleteData = async () => {
    try {
        await User.deleteMany()
        await Resume.deleteMany()
        await Template.deleteMany()
        console.log('Data Destroyed...'.red.inverse)
        process.exit()
    } catch (err) {
        console.error(err)
    }
}

if (process.argv[2] === '-i') {
    importData()
} else if (process.argv[2] === '-d') {
    deleteData()
}
