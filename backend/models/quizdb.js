const mongoose = require( "mongoose");
const {Schema} = mongoose;

const optSchema = new Schema({
    option : {type : String, required : true} 
},{_id : false});

const questSchema = new Schema({
    question : {type : String ,required : true},
    options : [optSchema]
},{_id : false});

const QuizSchema = new Schema({
    name : {type : String, required : true},
    duration : {type : Number , required : true},
    time : {type : Date , required : true},
    code : {type : Number, required : true, unique : true},
    quests : [questSchema]
});

const quizModel = mongoose.model("quiz",QuizSchema);
module.exports = {
    quizModel
}