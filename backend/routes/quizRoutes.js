const mongoose = require("mongoose");
const {Router} = require("express");
const {quizModel} = require("../models/quizdb");
const userModel = require("../models/User");
const quizRouter = Router();
const {isValid} = require("../middlewares/isValidUser");
const crypto = require("crypto");

function getRandom(){
    return crypto.randomBytes(2).toString("hex").toUpperCase();
}
quizRouter.post("/create",isValid,async (req,res)=>{
    const {name,duration,time,quests,answer} = req.body;
    try{
        await quizModel.create({
            name,
            duration,
            code : getRandom(),
            time,
            quests,
            answer
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

quizRouter.get("/getquiz",isValid,async (req,res)=>{
    const {roomId} = req.query;
    try{
        const foundQuiz = await quizModel.findOne({code : roomId});
        const foundUser = await userModel.findOne({_id : req.userId});
        if(!foundUser||!foundQuiz){
            return res.status(400).json({message : "Somthing went wrong in inputs!!"});
        }
        res.status(200).json({
            message : "/getQuiz working",
            foundQuiz
        })
    }catch(err){
        res.status(500).json({
            message : "Internal error occurred!!"
        });
    }
})

module.exports = {
    quizRouter
}
