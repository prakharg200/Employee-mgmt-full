const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Position = require('../models/positionModel')

//get all data entries
router.get("/",async (req,res)=>{
    try{
        const data = await Position.find({})
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})

//get single data entry
router.get("/:id",async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No entry found"})
    }

    const data = await Position.findById(id)
    
    if(!data){
        return res.status(404).json({error: "No entry found"})
    }
    res.status(200).json(data)
})

//create new entry
router.post("/",async (req,res)=>{
    const {company,position} = req.body
    try{
        const data = await Position.create({company,position})
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error: error.message})
    }
})


//delete an entry
router.delete("/:id",async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No entry found"})
    }

    const data = await Position.findByIdAndDelete(id)
    
    if(!data){
        return res.status(404).json({error: "No entry found"})
    }
    res.status(200).json(data)
})


//update an entry
router.patch("/:id",async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No entry found"})
    }

    const data = await Position.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!data){
        return res.status(404).json({error: "No entry found"})
    }
    res.status(200).json(data)
})


module.exports = router