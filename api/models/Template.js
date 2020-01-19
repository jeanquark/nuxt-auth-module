const mongoose = require('mongoose')

const TemplateSchema = new mongoose.Schema(
    {
        active: Boolean,
        author: {
            firstname: String,
            lastname: String,
            username: String,
            image: String
        },
        colors: {
            primaryColor: String,
            secondaryColor: String,
            tertiaryColor: String,
            backgroundColor: String,
            textColor: String
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)


module.exports = mongoose.model('Template', TemplateSchema)
