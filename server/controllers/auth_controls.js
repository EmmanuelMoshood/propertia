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

/************************************************************************/

const respondUserDataAndTokensToClient = (user, res ) => {
  const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "1d"
  });
  const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
  // 4. send user and token as response excluding password
  user.password = undefined;
  user.resetCode = undefined;

  //generated tokens and user data are return so that the client can store and use these tokens for authentication and future API requests.
    //dont want to send even the hashed password to the client, so set the value to undefined same with the resetCode
  res.json({
    user,
    token,
    refreshToken,
  });
}









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

    respondUserDataAndTokensToClient(user, res);
   

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
    respondUserDataAndTokensToClient(user, res)

  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong with login." });
  }
};


export const forgotPassword = async (req, res) => {
  console.log("forgot password controller was called")
  
  try{
    const { email } = req.body;
    

    //query your database to see if any user with that email exist.
    const user = await User.findOne({ email });
    console.log(user) 

    //If yes, then you can send a link to their email.
    if(!user){
      res.json({ error: "Could not find user with that email" });
    }
    else
    {
      //reset user code and save the code in the db
      const resetCode = nanoid()
      user.resetCode = resetCode;
      user.save();

      //generate a new token based on the reset code of the user
      const token = jwt.sign({resetCode}, config.JWT_SECRET, { expiresIn: "1d"})

      //send email using aws with the resetcode token
      const emailSubject = "reset your password here"
      const emailContent = `
                            <p>Please click the link below to access-acount </p>
                            <a href="${config.CLIENT_URL}/auth/access-account/${token}">Access your account</a>
                          `
      config.AWSSES.sendEmail(emailTemplate(email, emailContent, config.REPLY_TO, emailSubject), (err, data) =>{
        if(err){
          console.log(err)
          return res.json({ error: "Provide a valid email address" });
        } else {
          console.log(data)
          return res.json({ success: "Check email to access your account" });
        }
      })

    }

  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong when trying to handle forgot password." });
  }
};


// export const accessAccount = async (req, res) => {
//   try {
//     // verify token and check expiry
//     const { resetCode } = jwt.verify(req.body.resetCode, config.JWT_SECRET)

//     //make resetCode work just once
//     const user = await User.findOneAndUpdate({resetCode}, {resetCode : ""});

//     respondUserDataAndTokensToClient(user, res);

//   }catch (err) {
//     console.log(err);
//     return res.json({ error: "server___ issue trying to access account"})
//   }
// };

export const accessAccount = async (req, res) => {
  try {
    // verify token and check expiry
    const { resetCode } = jwt.verify(req.body.token, config.JWT_SECRET);

    const user = await User.findOneAndUpdate(
      { resetCode },
      { resetCode: "" }
    );

    console.log("user", user, resetCode);
    // return;

    // generate token
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "1d",
    });
    // generate refresh token
    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.password = undefined;
    user.resetCode = undefined;
    return res.json({
      token,
      refreshToken,
      user,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Expired or invalid token. Try again." });
  }
};

export const refreshToken = async (req, res) => {
  try {
    // console.log("you hit refresh token endpoint => ", req.headers);

    const { _id } = jwt.verify(req.headers.refresh_token, config.JWT_SECRET);

    const user = await User.findById(_id);
    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });
    const refreshToken = jwt.sign({ _id: user._id }, config.JWT_SECRET, {
      expiresIn: "30d",
    });
    // send user and tokens as response excluding password and resetCode
    user.password = undefined;
    user.resetCode = undefined;
    res.json({
      user,
      token,
      refreshToken,
    });
  } catch (err) {
    console.log("===> ", err.name);
    return res.status(403).json({ error: "Refresh token failed" }); // 403 is important
  }
};


export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Unauthorized" });
  }
};


export const publicProfile = async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err });
  }
};


// name username company image phone about
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        ...req.body,
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;
    res.json(user);
  } catch (err) {
    console.log(err);
    if (err.codeName === "DuplicateKey") {
      return res.status(403).json({ error: "Username is taken" });
    } else {
      return res.status(403).json({ error: "Unauhorized" });
    }
  }
};


export const updateUserPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.json({ error: "Password is required" });
    }

    // check if password meets the requirement
    if (password && password?.length < 6) {
      return res.json({
        error: "Min 6 characters long password is required",
      });
    }

    const user = await User.findById(req.user._id);
    const hashedPassword = await hashPassword(password);

    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });

    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "Unauthorized" });
  }
};