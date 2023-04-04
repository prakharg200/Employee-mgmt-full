const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Work = require('../models/workModel')

//get all data entries
router.get("/",async (req,res)=>{
    try{
        const data = await Work.find({})
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

    const data = await Work.findById(id)
    
    if(!data){
        return res.status(404).json({error: "No entry found"})
    }
    res.status(200).json(data)
})

//create new entry
router.post("/",async (req,res)=>{
    const { id, companyName, designation, fromDate, toDate } = req.body
    try{
        const data = await Work.create({ id, companyName, designation, fromDate, toDate })
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

    const data = await Work.findByIdAndDelete(id)
    
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

    const data = await Work.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!data){
        return res.status(404).json({error: "No entry found"})
    }
    res.status(200).json(data)
})


module.exports = router