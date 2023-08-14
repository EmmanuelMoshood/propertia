import express from "express";
import * as authControllers from "../controllers/auth_controls.js";
import { requireSignin } from "../middlewares/auth_middlewares.js";

const router = express.Router();



// read home page
router.get("/", requireSignin, authControllers.welcomeMsg);

// create new user, pre-registration phase
router.post("/pre-register", authControllers.preRegister );

// create and  save new user
router.post("/register", authControllers.register);

// on user login
router.post("/login", authControllers.login);

// on clicking forgot-password, ask user for email
router.post("/forgot-password", authControllers.forgotPassword);

// after receiving link in email to activate forgotten password 
router.post("/access-account", authControllers.accessAccount);

// get new tokens
router.get("/refresh-token", authControllers.refreshToken);

// read logged in user data privately
router.get("/current-user", requireSignin, authControllers.currentUser)

// read user data publicly 
router.get("/profile/:username", authControllers.publicProfile)

// update user profile
router.put("/update-user-profile", requireSignin, authControllers.updateUserProfile)

// update user password
router.put("/update-user-password", requireSignin, authControllers.updateUserPassword)

//test endpoint
router.get('/test', (req, res) => {
    res.send('Hello from the test endpoint!');
    console.log("test request worked")
  });




export default router;