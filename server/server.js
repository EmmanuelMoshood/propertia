// server/server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {DATABASE, PORT} from "./config.js";
import mongoose from "mongoose";
import authRoutes from "./routes/auth_routes.js"
import adsRoutes from "./routes/ads_routes.js"


const app = express();


// setup db
mongoose.set("strictQuery", false); // to fix depreciation warning 
mongoose
.connect(DATABASE)
.then(() => console.log("db is connected"))
.catch((error) => console.log(`error in connecting to db: "${error}`));

// middlewares
app.use(express.json()); //converts body in request to json
app.use(morgan("dev"));
app.use(cors());

//to use my routers as middleware
app.use('/api', authRoutes);
app.use('/api', adsRoutes);





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));