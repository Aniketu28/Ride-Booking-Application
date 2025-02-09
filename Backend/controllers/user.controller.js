const userModel = require("../models/user.model");
const createUser = require("../services/user.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

const registerUser = async (req,res,next)=>{

    const {fullName,email,password} = req.body;

    const user = await userModel.findOne({email});

    if(user){
        return res.status(201).json({message:"user Alredy present"});
    }
   
   
    const hashPassword = await userModel.hashPassword(password);

    const Newuser = await createUser({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email: email,
        password: hashPassword,
    });

    const token = Newuser.generateAuthToken();

    // console.log(token)

    return res.status(201).json({
        token,Newuser
    });
    
}

const loginUser = async (req,res,next)=>{
   
    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json("Invalid Email And Password");
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json("Invalid Email And Password");
    }

    const token = user.generateAuthToken();

    res.cookie("token",token);

    return res.status(201).send({
        token,user
    });
}

const getUserProfile = (req,res,next)=>{

     res.status(200).json(req.user)
}

const logoutUser = async (req,res,next)=>{   

    res.clearCookie("token");
    
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistTokenModel.create({token:token});

    res.status(200).json({message:"logout"});
}


module.exports = {registerUser,loginUser,getUserProfile,logoutUser};