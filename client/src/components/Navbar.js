import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="#">PROPERTIA</NavLink>
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
                        <NavLink className="nav-link" to="/logout">Log Out</NavLink>
                    </div>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-secondary my-2 my-sm-0" type="submit" fdprocessedid="5dsuph">Search</button>
                </form>
                </div>
            </div>
        </nav>
    )
}


