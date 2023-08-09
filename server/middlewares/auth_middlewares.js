import jwt from "jsonwebtoken";
import * as config from "../config.js";


//requireSignin middleware will be used to make sure user is signed in
export const requireSignin = (req, res, next) => {
//   console.log("__REQ_HEADERS__", req.headers);
  try {
    const decoded = jwt.verify(req.headers.authorization, config.JWT_SECRET);
    // console.log("DECODED => ", decoded);
    req.user = decoded; //adds user:decoded as keys and values to the req 
    console.log(req.user)
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};