const mongoose = require("mongoose");
const {Router} = require("express");
const {quizModel} = require("../models/quizdb");
const quizRouter = Router();
const crypto = require("crypto");

function getRandom(){
    return crypto.randomBytes(2).toString("hex").toUpperCase();
}
quizRouter.post("/create",async (req,res)=>{
    const {name,duration,time,quests} = req.body;
    try{
        await quizModel.create({
            name,
            duration,
            code : getRandom(),
            time,
            quests
        });
        res.status(200).json({
            message : "Created"
        });
    }catch(err){
        console.log("Err occurred in /create");
        res.status(500).json({
            message : "Err occurred in /create",
            err
        })
    }
});

quizRouter.get("/getquiz",async (req,res)=>{
    const {name,roomId} = req.query;
    try{
        const foundQuiz = await quizModel.findOne({code : roomId});
        if(foundQuiz){
            res.status(200).json({
                message : "/getQuiz working",
                foundQuiz
            })
        }else{
            res.status(400).json({
                message : "Invalid room id"
            })
        }
    }catch(err){
        res.status(500).json({
            message : "Error in finding the room!!"
        });
    }
})

module.exports = {
    quizRouter
}
