const userModel = require("../models/user.model");

const createUser = async ({firstName,lastName,email,password})=>{
    
    if(!firstName || !lastName || !email || !password){

        throw new Error("All Fields are required");
    }

    const user = userModel.create({

        fullName:{
            firstName,
            lastName
        },
        email,
        password
    });

    return user

}

module.exports = createUser;