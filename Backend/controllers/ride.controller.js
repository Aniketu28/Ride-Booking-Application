const { createRide, getFare } = require("../services/ride.service");
const { geocodeAddress , getCaptainInRadius } = require("../services/map.service");
const {sendMessageToSocketId} = require("../socket");
const rideModel = require("../models/ride.model");


const createUserRide = async (req, res) => {

    const {user, pickeUp, destination, vehicelType } = req.body;

    try {

        const ride = await createRide(user, pickeUp, destination, vehicelType);

        res.status(201).json(ride);

        const pickupcode = await geocodeAddress(pickeUp);

        const captainInRadius = await getCaptainInRadius(pickupcode.lat,pickupcode.lon,5);

        let rideWithUser = await rideModel
        .findOne({ _id: ride._id }) 
        .populate('user'); 

        captainInRadius.map( captain =>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data:rideWithUser
            })
        })

    } catch (error) {

        return res.status(400).json({ message: error.message });
    }
}

const getFareController = async (req, res) => {

    const { pickeUp, destination } = req.query;

    try {
        const pickupcode = await geocodeAddress(pickeUp);
        
        const destinationcode = await geocodeAddress(destination);

        // console.log(pickupcode,destinationcode)

        const fare = await getFare(pickupcode, destinationcode);

        res.status(200).json(fare);

    }catch(e){
        console.log(e.message);
    }    
}

module.exports = { createUserRide, getFareController }