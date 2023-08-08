//import all variables from config
import * as config from "../config.js"

//import jwt to generate tokens sent to emails
import jwt from "jsonwebtoken"




export const emailTemplate = (email, content, replyTo, subject) =>{
    return {
        Source: config.EMAIL_FROM,
        Destination: {
          ToAddresses: [email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `
                        <html>
                            ${content}
                            <p>&copy; ${new Date().getFullYear()}</p>
                        <html>    
                    `,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: subject,
          },
        },
      }
} 