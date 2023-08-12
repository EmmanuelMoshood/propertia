// store user input in a component
import { useState } from "react";
// import { useAuth } from "../context/auth";

// hppt client
import axios from "axios";

//API connection
import {API} from "../config"

// handle sending user message on error / success
import toast from "react-hot-toast"

//navigate to page on click
import { useNavigate } from "react-router-dom";


//components
// import UserStatus from "../components/UserStatus"
// import LikesButton from "../components/LikesButton";



export default function Register() {
    //state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [loading, setLoading] = useState(false)

    //hooks
    const navigate = useNavigate(); 

    //context
    // useAuth.user.firstName = firstName; 

    // onSubmit
    const handleSubmit = async (e) => {
        try{
            setLoading (true)
            e.preventDefault();
            // console.table({ email, password })

            const res = await axios.post(`${API}/pre-register`, {email, password}) 
            const {data} = res;
            console.log(data)

            if(data?.error){
                toast.error(data.error);
                setLoading(false)
            } else {
                toast.success('Please check your email to activate your account')
                setLoading(false)
                navigate("/activate-account")
            }

        }catch(err){
            console.log(err)
            toast.error("Pre-registration error");
            setLoading(false)
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
              <label for="exampleInputEmail1" className="form-label mt-4">First Name</label>
              <input 
                type="firstName" 
                className="form-control" 
                id="firstName" 
                placeholder="Enter your name" 
                fdprocessedid="cz21oqnm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1" className="form-label mt-4">Email Address</label>
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
      
 
            <button 
                type="submit" 
                disabled= {loading}
                className="btn 
                btn-primary mt-4" 
                fdprocessedid="hnwth">
                    {loading ? "Waiting..." : "Register"}
            </button>
          </fieldset>
        </form>
      </div> 
    );
  }