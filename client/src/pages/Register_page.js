// store user input in a component
import { useState } from "react";

// hppt client
import axios from "axios";

//API connection
import {API} from "../config"

// error handling
import toast from "react-hot-toast"


//components
// import UserStatus from "../components/UserStatus"
// import LikesButton from "../components/LikesButton";



export default function Register() {
    //state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //
    const handleSubmit = async (e) => {
        try{
            e.preventDefault();
            // console.table({ email, password })

            const res = await axios.post(`${API}/pre-register`, {email, password}) 
            const {data} = res;
            console.log(data)

            if(data?.error){
                toast.error(data.error);
            } else {
                toast.success('Please check your email to activate your account')
            }

        }catch(err){
            console.log(err)
            toast.error("Pre-registration error");

        }
    }
 


    return (
      <div>
    
        {/* <UserStatus />
        <LikesButton /> */}

        <form className="container col-lg-4 offset-lg-4 mt-5"
                onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-center">User Registration</legend>
            
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label mt-4">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="userEmail" 
                aria-describedby="emailHelp" 
                placeholder="Enter email" 
                fdprocessedid="cz21oq"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
              <input 
              type="password" 
              className="form-control" 
              id="userPassword" 
              placeholder="Password" 
              autocomplete="off" 
              fdprocessedid="o2rlil" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            </div>
      
 
            <button type="submit" className="btn btn-primary mt-4" fdprocessedid="hnwth">Register</button>
          </fieldset>
        </form>
      </div> 
    );
  }