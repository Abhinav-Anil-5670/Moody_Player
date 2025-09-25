const express = require('express')
const router = express.Router()
const multer = require("multer") //middleware for form data files
const uploadFile = require("../service/storage.service")
const songModel = require('../models/songs.model')
const upload = multer({storage:multer.memoryStorage()})

router.post('/songs',upload.single("audio") ,async (req,res)=>{ //here audio -> is the key value in the key pair value for sending the audio file using postman
    console.log(req.body)
    console.log(req.file)
    const fileData = await uploadFile(req.file)

    const song = await songModel.create({
        title : req.body.title,
        artist : req.body.artist,
        audio : fileData.url,
        mood : req.body.mood
    })
    console.log(fileData)
    res.status(201).json({
        message : "Song Sent Successfully",
        song : song
    })
})

router.get('/songs',async (req,res)=>{
    const {mood} = req.query
    const songs = await songModel.find({
        mood : mood
    })

    res.status(200).json({
        message : "Songs Fetched Successfully",
        song : songs
    })
})

module.exports = router