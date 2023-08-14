//this manages ui for forgot password

//manage variables with this component
import { useState } from "react";
//displays notifications on the ui
import toast from "react-hot-toast";
//to make hhtp request from react app
import axios from "axios";
//Link is a component from react-router-dom and useNavigate is a react hook, both for navigation
import { Link, useNavigate } from "react-router-dom";
//API connection
import {API} from "../../config"




/************************************************************ ForgotPassword */
//define my component
export default function ForgotPassword() {

    //initialize variables 
    const [email, setEmail] = useState("");
    const [isLoading, setisLoading] = useState(false);
    
    // hooks
    //this method/hook from react is used to navigate to any route as a function call
    const navigate = useNavigate();
    
    //on sumbit; - post request - handle errors -change state of isLoading -navigate to EmailSent page
    const handleSubmit = async (e) => {
        //stop default submission behaviour
        e.preventDefault();
        try {
          //send POST req to server at /forgot-password endpoint
          console.log("forgot-password___________________")
          const res = await axios.post(`${API}/forgot-password`, {
              email
          });
          const {data} = res;
          console.log(data)

          if(data?.error){
              toast.error(data.error);
          
          //if success, stop isLoading var, display success on ui and navigate to EmailSent page
          } else {
              setisLoading(false);
              toast.success("Check email to access your account");
              navigate("/activate-account");
          }
        } catch (err) {
        console.log(err);
        setisLoading(false);
        toast.error("Client___forgot password didnt work");
        }
  };

  //ui to display
  return (
    <div>
      <h3 className="d-flex justify-content-center mt-5">Enter your email address</h3>
      <div className="container">
        <div className="row">
          <div className="col-md-4 offset-md-4 mt-5">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control mb-4"
                //bind the value of the field with the input field
                value={email}
                //on every change to this field, the value is change to lowercase and email variable is set
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
                autoFocus
              />

              <button
                className="btn btn-primary col-12 mb-4"
                disabled={isLoading}
              >
                {isLoading ? "Waiting..." : "Forgot password"}
              </button>
            </form>

            <Link to="/login" className="text-danger">
              Back to login
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}