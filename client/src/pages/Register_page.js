// pages/Home.js

//components
import UserStatus from "../components/UserStatus"
import LikesButton from "../components/LikesButton";



export default function Register() {
    return (
      <div>
        <h1 className="display-1 bg-primary text-light p-5">Register</h1>
        <UserStatus />
        <LikesButton />
      </div> 
    );
  }