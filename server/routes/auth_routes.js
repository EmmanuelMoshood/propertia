import express from "express";
import * as authControllers from "../controllers/auth_controls.js";

const router = express.Router();



// get home page
router.get("/", authControllers.welcomeMsg);

// where newuser is verified
router.post("/pre-register", authControllers.preRegister );

// register, after token is created
router.post("/register", authControllers.register);


export default router;