
import {hashPassword, comparePassword} from "../utilities/helpers.js";
import Ad from "../models/ad_model.js"
//import all variables from config
import * as config from "../config.js"

//import jwt to generate tokens 
import jwt from "jsonwebtoken"

//import nanoid to create unique usernames
import {nanoid} from "nanoid"

//library for validating user inputs
import validator from "email-validator"

/************************************************************************/



export const ads = async (req, res) => {
  try {
    const adsForSell = await Ad.find({ action: "Sell", published: true })
      .select( //deselect some things form the return we get
        "-photos.Key -photos.key -photos.ETag -photos.Bucket -location -googleMap"
      )
      .populate("postedBy", "name username email phone company")
      .sort({ createdAt: -1 })
      .limit(12);

    const adsForRent = await Ad.find({ action: "Rent", published: true })
      .select(
        "-photos.Key -photos.key -photos.ETag -photos.Bucket -location -googleMap"
      )
      .populate("postedBy", "name username email phone company")
      .sort({ createdAt: -1 })
      .limit(12);

    res.json({ adsForSell, adsForRent });
  } catch (err) {
    console.log(err);
  }
};