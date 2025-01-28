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



module.exports = {
    quizRouter
}
