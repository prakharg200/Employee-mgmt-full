const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    fromDate:{
        type: String,
        required: true
    },
    toDate:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Work", workSchema)