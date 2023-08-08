const testData = { data: "welcome message is nodejs api"}

import { emailTemplate } from "../utilities/email_template.js";
import {hashPassword, comparePassword} from "../utilities/helpers.js";
import User from "../models/user_model.js"
//import all variables from config
import * as config from "../config.js"

//import jwt to generate tokens 
import jwt from "jsonwebtoken"

//import nanoid to create unique usernames
import {nanoid} from "nanoid"

//library for validating user inputs
import validator from "email-validator"

//business logics 
//read home page data
export const welcomeMsg = (req, res) =>{
    res.json(testData)};

//use new user data to create token and send link to email
export const preRegister = async (req, res) => {
    // create jwt with email and password then email as clickable link
    // only when user click on that email link, registeration completes
    try {
        //get user email and passwd
        const { email, password } = req.body;

        //validation for email and passwd
        if(!validator.validate(email)){
          return res.json({ error: "A valid email is required" })
        }
        if(!password || password?.length < 6){
          return res.json({ error: "Password should be more than 6 characters"})
        }
        const userWithSameEmail = await User.findOne({ email });
        if(userWithSameEmail){
          return res.json({error: "Email is taken"})
        }

        //generate a token with email, passwd and the server jwt secret
        // const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        const token = jwt.sign({ email, password }, config.JWT_SECRET, {expiresIn: "1h"})

        //Content for email sent to user activation
        const emailSubject = "Activate your account for Propertia"
        const emailBody = `
          <h1>Welcome to Propertia Real Estate Application</h1>
          <p>please click the link below to activate your account</p>
          <a href="${config.CLIENT_URL}/auth/activate/${token}">Activate</a>
        `

        config.AWSSES.sendEmail(
          emailTemplate(email, emailBody, config.REPLY_TO, emailSubject),
            (err, data) => {
              if (err) {
                console.log("Provide a valid email address", err);
                return res.json({ ok: false });
              } else {
                console.log("Check email to complete registration", data);
                return res.json({ ok: true });
              }
            }
          );
        } catch (err) {
          console.log(err);
        }
};
    

export const register = async (req, res) => {
  try{
    //decode the token in request body and get the email and password
    const {email, password} = jwt.verify(req.body.token, config.JWT_SECRET)

    const hashedPassword = await hashPassword(password);

    //save new user with a unique name, the email and hashed password
    const user = await new User({
      username: nanoid(8),
      email: email,
      password: hashedPassword,
    }).save();

    //to be used to identify the user during their session.
    const token = jwt.sign({_id: user._id}, config.JWT_SECRET, {
      expiresIn: "1h",
    })
    const refreshToken = jwt.sign({_id: user._id}, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    //generated tokens and user data are return so that the client can store and use these tokens for authentication and future API requests.
      //dont want to send even the hashed password to the client, so set the value to undefined same with the resetCode
      user.password = undefined;
      user.resetCode = undefined;
    return res.json({
      token,
      refreshToken,
      user
    })

  } catch (err) { 
    console.log(err)
    return res.json({ error: "something went wrong registering the user"})
  }
};
  
    
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "Please register first" });
    }
    // 2. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    // 3. create jwt tokens
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "30d",
    });
    // 4. send user and token as response excluding password
    user.password = undefined;
    user.resetCode = undefined;

    res.json({
      user,
      token,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong with login." });
  }
};


export const forgotPassword = async (req, res) => {
  try{
    const { email } = req.body;

    //query your database to see if any user with that email exist.
    const userWithThatEmail = await findOne({ email })

    //If yes, then you can send a link to their email.
    if(userWithThatEmail){
      //reset user code and save the code in the db
      const resetCode = nanoid()
      userWithThatEmail.resetCode = resetCode;

      //generate a new token based on the reset code of the user
      const token = jwt.sign({ resetCode}, config.JWT_SECRET, { expiresIn: "1hr"})

      //send email using aws with the resetcode token
      const emailSubject = "reset your password here"
      const emailContent = `
                            <p>Please click the link below to access-acount </p>
                            <a href="${config.CLIENT_URL}/auth/access-acount/${token}">Access your account</a>
                          `
      config.AWSSES.sendEmail(emailTemplate(userWithThatEmail, emailContent, config.REPLY_TO, emailSubject), (err, data) =>{
        if(err){
          console.log(err)
          return res.json({ ok: false});
        } else {
          console.log(data)
          return res.json({ ok: true})
        }
      })

    }else {
      return res.json({ error: "Email doesnt exist in the database"})
    }

  } catch (err) {

  }
}