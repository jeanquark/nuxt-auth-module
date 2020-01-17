const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
// const dotenv = require('dotenv');
// const faker = require('faker/locale/fr')

// Load env vars
// dotenv.config({ path: './config/config.env' });
require('dotenv').config()

// Load models
// const Bootcamp = require('./models/Bootcamp')
// const Course = require('./models/Course');
// const User = require('./models/User');
// const Review = require('./models/Review');
const User = require('./models/User')
const Resume = require('./models/Resume')
const Template = require('./models/Template')

// const { generateFakeTemplates } = require('./_data/templates')
// const templates = generateFakeTemplates(10)
const fakeDataGenerator = require('./utils/fakeDataGenerator')
const templates = fakeDataGenerator.generateFakeTemplates(10)
console.log('templates: ', templates)
const resumes = fakeDataGenerator.generateFakeResumes(5)
console.log('resumes: ', resumes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

// Read JSON files
// const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'))

// const courses = JSON.parse(
	//   fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8')
	// );
	
	// const users = JSON.parse(
		//   fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
		// );
		
		// const reviews = JSON.parse(
			//   fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
			// );
			
			const users = JSON.parse(
				fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
				)
				
// const resumes = JSON.parse(fs.readFileSync(`${__dirname}/_data/resumes.json`, 'utf-8'))

// const templates = []

// for (let i = 0; i < 10; i++) {
// 	templates.push({
// 		active: faker.random.boolean(),
// 		author: {
// 			firstname: faker.name.firstName(),
// 			lastname: faker.name.lastName(),
// 			username: faker.internet.userName(),
// 			image: faker.random.image()
// 		},
// 		colors: {
// 			primaryColor: faker.internet.color(),
// 			secondaryColor: faker.internet.color(),
// 			tertiaryColor: faker.internet.color(),
// 			backgroundColor: faker.internet.color(),
// 			textColor: faker.internet.color()
// 		}
// 	})
// }


// Import into DB
const importData = async () => {
    try {
        // await Bootcamp.create(bootcamps)
        // await Course.create(courses);
		// await Review.create(reviews);
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
        // await Bootcamp.deleteMany()
        // await Course.deleteMany();
        // await User.deleteMany();
		// await Review.deleteMany();
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
