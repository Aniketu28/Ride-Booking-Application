const rideModel = require("../models/ride.model");
const {getDistanceAndTime,geocodeAddress} = require("../services/map.service")


async function getFare(pickup, destination) {

    const { distance, duration} = await getDistanceAndTime(pickup, destination);  

    // Fare calculation for Auto
    const autoBaseFare = 30;   //A base fare (flat starting charge).
    const autoPerKm = 10;      //A per km fare (for the distance traveled).
    const autoPerMin = 2;      //A per minute fare (for the time spent during the ride).
    const auto = (autoBaseFare + (distance * autoPerKm) + (duration * autoPerMin)).toFixed(2);  //total

    // Fare calculation for Car
    const carBaseFare = 50;
    const carPerKm = 15;
    const carPerMin = 3;
    const car = (carBaseFare + (distance * carPerKm) + (duration * carPerMin)).toFixed(2);

    // Fare calculation for Bike
    const bikeBaseFare = 20;
    const bikePerKm = 5;
    const bikePerMin = 1;
    const bike = (bikeBaseFare + (distance * bikePerKm) + (duration * bikePerMin)).toFixed(2);

    // Return the fares for all three vehicles
    
    return {
        auto,
        car,
        bike
    };
}

function generateOTP() {
    let otp = '';
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10); // generates a random number between 0 and 9
    }
    return otp;
}


async function createRide(user,pickup,destination,vehicelType) {

    const pickupcode = await geocodeAddress(pickup);
    const destinationcode = await geocodeAddress(destination);

    const fare = await getFare(pickupcode,destinationcode);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        fare:fare[vehicelType],
        otp:generateOTP()
    });

     return ride;
}

module.exports = {createRide,getFare}