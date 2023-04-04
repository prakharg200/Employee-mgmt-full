const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    leaveType:{
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
    },
    reasonforleave:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Leave", leaveSchema)