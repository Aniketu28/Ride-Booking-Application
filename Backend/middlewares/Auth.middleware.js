const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model");

const AuthUser = async (req,res,next)=>{
   
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
       return res.status(401).json({message:"unauthorized"});
    }

    isBlacklistedToken = await blacklistTokenModel.findOne({token:token});

    if(isBlacklistedToken){
      return res.status(401).json({message:"unauthorized"});
    }

    try{

       const decoded = jwt.verify(token,process.env.JWT_SECRET);
       const user = await userModel.findById(decoded._id);

       req.user = user;

       return next();

    }catch(error){

        return res.status(401).json({message:"unauthorized"});

    }
}

module.exports = {AuthUser}