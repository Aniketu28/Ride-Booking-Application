const axios = require("axios");
const captainModel = require("../models/captain.model")


const geocodeAddress = async (address) => {

    try {

        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                addressdetails: 1,
                limit: 1,
            },
        });

        const data = response.data[0];

        const lat = data.lat;
        const lon = data.lon;

        return { lat, lon };

    } catch (error) {
        console.error('Error during geocoding:', error);
    }
}


const getDistanceAndTime = async (origin, destination) => {

    const osrmUrl = 'http://router.project-osrm.org/route/v1/driving';

    const routeUrl = `${osrmUrl}/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false`;

    try {

        const response = await axios.get(routeUrl);
        const routeData = response.data.routes[0];

        // Extract and convert the data
        const distance = routeData.distance / 1000;  // Convert distance to kilometers
        const duration = routeData.duration / 60;    // Convert duration to minutes

        return { distance, duration };

    } catch (error) {
        console.error('Error fetching route:', error);
    }
};



async function getSuggestions(query) {

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err) {
        console.error('Error fetching suggestions:', err);
        return [];
    }
}

async function getCaptainInRadius(ltd, lng, radius) {

    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[ltd, lng], radius / 6371]  //radius in km 
            }
        }
    });

    return captains;
}

module.exports = { geocodeAddress, getDistanceAndTime, getSuggestions, getCaptainInRadius };