const express = require("express");
const router = express.Router();
const {registerCaptain,loginCaptain,getCaptainProfile,logoutCaptain} = require("../controllers/captain.controller");
const {Authcaptain} = require("../middlewares/captainAuth.middleware");


router.post("/register",registerCaptain);
router.post("/login",loginCaptain);
router.get("/profile",Authcaptain,getCaptainProfile);
router.get("/logout",Authcaptain,logoutCaptain);

module.exports = router;