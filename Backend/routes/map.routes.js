const express = require("express");
const router = express.Router();
const {AuthUser} = require("../middlewares/Auth.middleware")
const {getCoordinates,getDistanceTime,getSuggestion} = require("../controllers/map.controller")

router.post('/get-coordinates',getCoordinates);
router.post('/get-distanceTime',getDistanceTime);
router.get('/get-suggesions',getSuggestion);


module.exports = router;