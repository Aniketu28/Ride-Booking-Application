const express = require("express");
const router = express.Router();
const {AuthUser} = require("../middlewares/Auth.middleware");
const {createUserRide,getFareController} = require("../controllers/ride.controller");

router.post("/create",createUserRide)
router.get("/get-fare",getFareController);

module.exports = router;