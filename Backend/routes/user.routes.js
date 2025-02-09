const express = require("express");
const router = express.Router();
const {registerUser,loginUser,getUserProfile,logoutUser} = require("../controllers/user.controller");
const {AuthUser} = require("../middlewares/Auth.middleware");


router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",AuthUser,getUserProfile);
router.get("/logout",AuthUser,logoutUser);

module.exports = router;