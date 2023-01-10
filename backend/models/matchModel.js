const mongoose = require('mongoose')

const matchSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: [true, 'Please add a title']
        },
        date: {
            type: Date,
            required: [true, 'Please add a date']
        },
        image: {
            data: Buffer,
            contentType: String
        },
        places: {
            type: Number,
            required: [true, 'Please add a number of places']
        },
        equipe: {
            type: String,
        },
        deploy: {
            type: Boolean,
            default: true,
        },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        },
        price: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Match', matchSchema)