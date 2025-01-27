const mongoose = require("mongoose");
const {Router} = require("express");
const {quizModel} = require("../models/quizdb");
const quizRouter = Router();

let roomId = 200;//first room
//hosting a room
quizRouter.post("/create",async (req,res)=>{
    const {name,duration,time,quests} = req.body;
    try{
        await quizModel.create({
            name,
            duration,
            code : roomId,
            time,
            quests
        });
        res.status(200).json({
            message : "Created"
        });
        console.log("Here");
        roomId++;//for next room
    }catch(err){
        console.log("Err occurred in /create");
        res.status(500).json({
            message : "Err occurred in /create",
            err
        })
    }
});

quizRouter.get("/quiz",(req,res)=>{
    const {roomId} = req.body;
})

module.exports = {
    quizRouter
}
