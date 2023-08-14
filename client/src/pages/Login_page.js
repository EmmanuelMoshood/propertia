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
import { useNavigate, Link } from "react-router-dom";

//
import { useAuth } from "../context/auth";


export default function Login() {
  //context
  const [ auth, setAuth] = useAuth();

  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //hooks
  const navigate = useNavigate(); 

  
  //onSubmit
  const handleSubmit = async (e) => {
    try{
        setLoading (true)
        e.preventDefault();
        // console.table({ email, password })

        //make http request with email and password in the body
        const res = await axios.post(`${API}/login`, {email, password}) 
        const {data} = res;
        console.log(data)

        if(data?.error){
            toast.error(data.error);
            setLoading(false)
        } else {
            setAuth(data)
            localStorage.setItem("auth", JSON.stringify(data));
            toast.success('welcome to your dashboard')
            setLoading(false)
            navigate("/")
        }

    }catch(err){
        console.log(err)
        toast.error("Pre-registration error");
        setLoading(false)
    }
}

    return (
      <div>
        
        <form className="container col-6 mt-5" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-center">LOGIN</legend>
            
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
              <small id="passwordHelp" className="form-text text-muted">If you can't seem to remember your password, click <Link to="/auth/forgot-password" className="text-danger">forgot password</Link></small>
            </div>
      
 
            <button 
            type="submit" 
            className="btn btn-primary mt-4" 
            fdprocessedid="hnwth"
            >{loading? "please wait":"Submit"}</button>
          </fieldset>
        </form>
        

      </div>
    );
  }