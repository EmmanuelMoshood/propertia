import express from "express";
import * as authControllers from "../controllers/auth.js";

const router = express.Router();



// get home page
router.get("/", authControllers.welcomeMsg)

// where newuser is verified
router.post("/pre-register", authControllers.preRegister )


export default router;