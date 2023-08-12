import React, { useEffect } from "react";

//to grab params from url
import { useParams } from "react-router-dom";


export default function AccountActivate() {
    //hooks
    const params = useParams();
    const {token} = params
    console.log(token)

    useEffect(()=>{
        if(token){
            requestActivationToken();
        }
    }, [token]);

    const requestActivationToken = async () => {
        try {

        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="display-1  d-flex justify-content-center align-item-center vh-100" style={{marginTop: '10%'}}>
            <h1>completing user registration...</h1>
        </div>
    )
}