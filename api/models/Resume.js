const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const ResumeSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: [true, 'Please add a unique identifier'],
			trim: true,
            unique: [true, 'Resume identifier must be globally unique'],
            min: [2, 'Resume unique identifier can not be less than 2 characters'],
            maxlength: [50, 'Resume unique identifier can not be more than 50 characters']
        },
        active: Boolean,
        job_title: String,
        job_description: String,
        language: {
            code: { type: String },
            name: { type: String },
            nativeName: { type: String },
            slug: { type: String },
            flag: { type: String }
        },
        languages: [
			{
            	code: { type: String },
            	name: { type: String },
            	nativeName: { type: String },
            	slug: { type: String },
            	value: { type: Number }
			}
		],
        education: [
			{
				title: { type: String },
				city: { type: String },
				country: { type: String },
				description: { type: String },
				start_date: { type: String },
				end_date: { type: String },
				school: { type: String },
				position: {
					lat: { type: Number },
					lng: { type: Number }
				},
			}
		],
		work_experience: [
			{
				job_title: { type: String },
				job_description: { type: String },
				city: { type: String },
				company: { type: String },
				country: { type: String },
				start_date: { type: String },
				end_date: { type: String },
				position: {
					lat: { type: Number },
					lng: { type: Number }
				},
			}
		],
		skills: [
			{
				name: { type: String },
				category: { type: String },
				value: { type: Number },
				type: { type: String },
			}
		],
		password: { 
			type: String,
			minLength: 4,
			maxLength: 32
		}
        // menus: Object,
        // name: String,
        // parameters: Object,
        // personal_data: Object,
        // picture: String,
        // skills: Array,
        // social_networks: Array,
        // statistics_last_visits: Array,
        // statistics_views_count: Number,
        // template: Object,
        // uploads: Array,
        // colors: Object,
        // contact_form_validation: Object,
        // fieds: Object,
        // user_id: ObjectId,
        // visibility: String,
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

// Create bootcamp slug from the name
ResumeSchema.pre('save', function(next) {
    // this.slug = slugify(this.name, { lower: true })
    next()
})

ResumeSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

// Match user entered password to hashed password in database
ResumeSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Cascade delete courses when a bootcamp is deleted
// ResumeSchema.pre('remove', async function(next) {
//     console.log(`Courses being removed from bootcamp ${this._id}`)
// 	await this.model('Resume').deleteMany({ Resume: this._id })
//     next()
// })


module.exports = mongoose.model('Resume', ResumeSchema)
