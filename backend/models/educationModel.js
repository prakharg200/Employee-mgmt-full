const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    schUni:{
        type: String,
        required: true
    },
    degree:{
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    poy:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Education", educationSchema)