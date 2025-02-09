const captainModel = require("../models/captain.model");

const createCaptain = async ({ firstName, lastName, email, password, status, color, plate, capacity, vehicleType}) => {
    if (!firstName || !lastName || !email || !password || !color || !plate || !capacity || ! vehicleType ) {
        throw new Error("All Fields are required");
    }

    const captain = await captainModel.create({
        fullName: {
            firstName,
            lastName
        },
        email,
        password,
        status:status,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
}

module.exports = createCaptain;
