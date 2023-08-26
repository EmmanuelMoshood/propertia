import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";


export const Navbar = (props) => {
    //context
    const [auth, setAuth] = useAuth();

    

    const logOut = () => {
        setAuth({ user:null, token:"", refreshToken:""});
        localStorage.removeItem('auth');
    }

    


    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand logo" to="#">
                <span className="text-bold">PROPERTIA</span>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor04" aria-controls="navbarColor04" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor04">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/">Home
                        <span className="visually-hidden">(current)</span>
                    </NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/about">About</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" to="#" >User</NavLink>
                    <div className="dropdown-menu">
                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                        <NavLink className="nav-link" to="#">Membership</NavLink>
                        <NavLink className="nav-link" to="/login" onClick={logOut}>Log Out</NavLink>
                    </div>
                    </li>
                </ul>
                
                </div>
            </div>
        </nav>
    )
}


