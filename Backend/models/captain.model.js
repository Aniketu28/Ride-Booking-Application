const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({

    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name will be minimum of 3 characters']
        },

        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last name will be minimum of 3 characters']
        }
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    socketId: {
        type: String,
    },

    status: {
        type : String,
        enum : ["active", "Inactive"],
        required : true
    },

    vehicle: {

        color: {
            type : String,
            require : true
        },

        plate: {
            type : String,
            require : true
        },

        capacity : {
            type : Number,
            require : true
        },

        vehicleType : {
            type : String,
            enum : ["car","bike","auto"],
            require : true
        }
    
    },

    location : {
        ltd : {
            type : Number
        },

        lng : {
            type : Number
        }
    }

});

captainSchema.methods.generateAuthToken = function () {

    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    
    return token;
}

captainSchema.methods.comparePassword = async function (password) {

   return await bcrypt.compare(password,this.password);

}

captainSchema.statics.hashPassword = async function (password) {

    return await bcrypt.hash(password,10);
 
 }
 
const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;