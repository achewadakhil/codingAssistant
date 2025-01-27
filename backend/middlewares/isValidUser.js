const jwt = require("jsonwebtoken");

const isValid = (req,res,next)=>{
    const {token} = req.headers;
    const foundUser = jwt.verify(token,process.env.JWT_SECRET).userId;
    if(!foundUser){
        res.status(400).json({
            message : "No user with token"
        });
    }else{
        req.userId = foundUser;
        next();
    }
}
module.exports ={
    isValid
}