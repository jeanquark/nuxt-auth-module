const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required: [ true, 'Please add a firstname' ],
        minlength: [2, 'Minimum length of firstname is 2 characters'],
        maxlength: [32, 'Maximum length of firstname is 32 characters']
    },
    lastname: {
        type: String,
        // required: [ true, 'Please add a lastname' ],
        minlength: [2, 'Minumum length of lastname is 2 characters'],
        maxlength: [32, 'Maximum length of lastname is 32 characters']
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Please add a valid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please add a valid password'],
        minlength: 6,
        maxlength: 128
    },
    role: {
        type: String,
        enum: ['User', 'Editor', 'Admin'],
        default: 'User'
    }
})

UserSchema.pre('save', function(next) {
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

// UserSchema.methods.comparePassword = function(candidatePassword, next) {
//     bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//         if (err) return next(err)
//         next(null, isMatch)
//     })
// }

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
// export default mongoose.model('User', UserSchema);
