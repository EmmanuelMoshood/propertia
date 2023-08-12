//to use routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
//to use global state
import { AuthProvider } from "./context/auth";
//to handle errors from API request
import { Toaster } from "react-hot-toast"

// pages
import Home from "./pages/Home_page";
import Register from "./pages/Register_page";
import Login from "./pages/Login_page";

// components
import {Navbar} from "./components/Navbar";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
        
    </BrowserRouter>

    
  );
}