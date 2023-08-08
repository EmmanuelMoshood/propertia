import express from "express";
import * as authControllers from "../controllers/auth_controls.js";

const router = express.Router();



// get home page
router.get("/", authControllers.welcomeMsg);

// on user signup 
router.post("/pre-register", authControllers.preRegister );

// register, after email token is created
router.post("/register", authControllers.register);

// on user login
router.post("/login", authControllers.login);

// on clicking forgot-password, ask user for email
router.post("/forgot-password", authControllers.forgotPassword)


export default router;