const express = require('express')
const router = express.Router()
const multer = require("multer") //middleware for form data files
const uploadFile = require("../service/storage.service")

const upload = multer({storage:multer.memoryStorage()})

router.post('/songs',upload.single("audio") ,async (req,res)=>{ //here audi -> is the key value in the key pair value for sending the audio file using postman
    console.log(req.body)
    console.log(req.file)
    const fileData = await uploadFile(req.file)
    console.log(fileData)
    res.status(201).json({
        message : "Song Sent Successfully",
        song : req.body
    })
})

module.exports = router