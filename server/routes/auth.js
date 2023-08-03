import express from "express";
import * as authControllers from "../controllers/auth.js";

const router = express.Router();



//api page
router.get("/", authControllers.welcomeMsg)


export default router;