import express from "express";

const router = express.Router();


const testData = { data: "nodejs api"}

router.get("/", (req, res) =>{
    res.json(testData)
})


export default router;