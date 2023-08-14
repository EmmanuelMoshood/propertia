import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"
import axios from "axios";
import { API } from "../../config";
import { useNavigate,  } from "react-router-dom";
import { useAuth } from "../../context/auth";

//to grab params from url
import { useParams } from "react-router-dom";


export default function AccountActivate() {
    //context
    const [auth, setAuth] = useAuth();

    //hooks
    const params = useParams();
    const {token} = params
    console.log(token)
    const navigate = useNavigate();


    //change state
    useEffect(()=>{
        if(token){
            requestAccess();
        }
    }, [token]);

    const requestAccess = async () => {
        try {
            //make http request with token in the body
            const {data} = await axios.post(`${API}/access-account`, {resetCode : token})
            if(data?.error){
                toast.error(data.error)
            } else {
                //save data in localStorage
                localStorage.setItem("auth", JSON.stringify(data))
                //save data in context
                setAuth(data)
                toast.success('You can update password in profile page')
                navigate("/"); 
            }
        } catch (err) {
            console.log(err)
            toast.error("client failed to request access___", err)
        }
    }

    






    return(
        <div className="display-1  d-flex justify-content-center align-item-center vh-100" style={{marginTop: '10%'}}>
            <h1>logging in...</h1>
        </div>
    )
}