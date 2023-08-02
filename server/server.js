// server/server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {DATABASE} from "./config.js";
import mongoose from "mongoose";

const app = express();


// setup db
mongoose.set("strictQuery", false); // to fix depreciation warning 
mongoose
.connect(DATABASE)
.then(() => console.log("db is connected"))
.catch((error) => console.log(`error in connecting to db: "${error}`));

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.get("/api", (req, res) => {
  res.json({ data: "hello world from nodejs api" });
});

app.listen(3000, () => console.log("Server running in port 3000"));