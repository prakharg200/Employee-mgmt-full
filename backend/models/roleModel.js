const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Role", roleSchema)