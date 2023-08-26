import express from "express";
import * as adsControls from "../controllers/ads_controls.js";
import { requireSignin } from "../middlewares/auth_middlewares.js";

const router = express.Router();




// routes
router.get("/ads", adsControls.ads);



router.get("/ads-test", (req, res)=>{
    res.json({"ok":"ads route is good"})
});


export default router;