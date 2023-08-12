// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home_page";
import Register from "./pages/Register_page";
import Login from "./pages/Login_page";

// components
import {Navbar} from "./components/Navbar";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar ></Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>

    
  );
}