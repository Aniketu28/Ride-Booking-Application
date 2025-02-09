const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectToDb = require("./Db/db");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const captainRoutes = require("./routes/captain.routes");
const mapRoutes = require("./routes/map.routes");
const rideRoute = require("./routes/ride.route")

connectToDb();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("hello");
});

app.use('/users', userRoutes);

app.use("/captains", captainRoutes);

app.use("/map", mapRoutes);

app.use("/ride",rideRoute);

module.exports = app;


