import express from "express";
import * as authControllers from "../controllers/auth_controls.js";
import { requireSignin } from "../middlewares/auth_middlewares.js";

const router = express.Router();



// get home page
router.get("/", requireSignin, authControllers.welcomeMsg);

// on user signup 
router.post("/pre-register", authControllers.preRegister );

// register, after email token is created
router.post("/register", authControllers.register);

// on user login
router.post("/login", authControllers.login);

// on clicking forgot-password, ask user for email
router.post("/forgot-password", authControllers.forgotPassword);

// after receiving link in email to activate forgotten password 
router.post("/access-account", authControllers.accessAccount);

// get new tokens
router.get("/refresh-token", authControllers.refreshToken);

// get logged in user data privately
router.get("/current-user", requireSignin, authControllers.currentUser)

// get user data publicly 
router.get("/profile/:username", authControllers.publicProfile)




export default router;