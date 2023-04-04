require('dotenv').config()
const express = require('express')
const cors = require('cors')
const roleRoutes = require('./routes/Role')
const positionRoutes = require('./routes/Position')
const educationRoutes = require('./routes/Education')
const leaveRoutes = require('./routes/Leave')
const workRoutes = require('./routes/Work')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/role',roleRoutes)
app.use('/api/position',positionRoutes)
app.use('/api/employee/education',educationRoutes)
app.use('/api/employee/leave',leaveRoutes)
app.use('/api/employee/work',workRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=>{
            console.log("connected to the database and port")
        })
    })
    .catch(error =>{
        console.log(error)
    })

