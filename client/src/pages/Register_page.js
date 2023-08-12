// pages/Home.js

//components
import UserStatus from "../components/UserStatus"
import LikesButton from "../components/LikesButton";



export default function Register() {

    const handleSubmit = async () => {
        try{
            
        }catch{

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
              <input type="email" className="form-control" id="userEmail" aria-describedby="emailHelp" placeholder="Enter email" fdprocessedid="cz21oq" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
              <input type="password" className="form-control" id="userPassword" placeholder="Password" autocomplete="off" fdprocessedid="o2rlil" />
            </div>
      
 
            <button type="submit" className="btn btn-primary mt-4" fdprocessedid="hnwth">Register</button>
          </fieldset>
        </form>
      </div> 
    );
  }