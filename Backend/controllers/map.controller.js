const { geocodeAddress, getDistanceAndTime, getSuggestions } = require("../services/map.service")


const getCoordinates = async (req, res) => {

    const { address } = req.body;

    try {

        const data = await geocodeAddress(address);

        res.status(201).json(data);


    } catch (e) {
        console.log(e);
    }

}

// const origin = { lat: 52.517037, lon: 13.388860 }; 
// const destination = { lat: 52.529407, lon: 13.397634 }; 

const getDistanceTime = async (req, res) => {

    const { origin, destination } = req.body;

    try {

        const data = await getDistanceAndTime(origin, destination);

        res.status(200).json(data);

    } catch (e) {
        console.log(e);
    }
}

const getSuggestion = async (req, res, next) => {

   const { input } = req.query;
 
    try {
        const suggestions = await getSuggestions(input);
        return res.status(200).json(suggestions); // Send suggestions as response
    } catch (err) {
        console.error('Error in /map/get-suggestions route:', err);
        return res.status(500).json({ message: 'An error occurred while fetching suggestions' });
    }
}



module.exports = { getCoordinates, getDistanceTime, getSuggestion };