const captainModel = require("../models/captain.model");
const createCaptain = require("../services/captain.service");
const blacklistTokenModel = require("../models/blacklistToken.model");

const registerCaptain = async (req, res, next) => {

    const { fullName, email, password, status, vehicle } = req.body;

    const captain = await captainModel.findOne({ email });

    if (captain) {
        return res.status(201).json({ message: "captain Alredy present" });
    }

    const hashPassword = await captainModel.hashPassword(password);

    const Newcaptain = await createCaptain({
        firstName: fullName.firstName,
        lastName: fullName.lastName,
        email: email,
        password: hashPassword,
        status : status,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });

    const token = Newcaptain.generateAuthToken();

    return res.status(201).send({
        token, Newcaptain
    });

}

const loginCaptain = async (req, res, next) => {

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json("Invalid Email And Password");
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json("Invalid Email And Password");
    }

    const token = captain.generateAuthToken();

    res.cookie("token", token);

    return res.status(201).send({
        token, captain
    });
}

const getCaptainProfile = (req, res, next) => {

    res.status(200).json(req.captain)
}

const logoutCaptain = async (req, res, next) => {

    res.clearCookie("token");

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    await blacklistTokenModel.create({ token: token });

    res.status(200).json({ message: "logout" });
}


module.exports = { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };