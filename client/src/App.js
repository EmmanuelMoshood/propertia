//to use routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
//to use global state
import { AuthProvider } from "./context/auth";
//to handle errors from API request
import { Toaster } from "react-hot-toast"

// components
import {Navbar} from "./components/Navbar";

// pages
import Home from "./pages/Home_page";
import Register from "./pages/Register_page";
import Login from "./pages/Login_page";
import EmailSent from "./pages/EmailSent_page";
import AccountActivate from "./pages/auth/AccountActivate";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AccessAccount from "./pages/auth/AccessAccount"
import Dashboard from "./pages/user/Dashboard";




export default function App() {
  return (
    <BrowserRouter>
      
      <Toaster />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate-account" element={<EmailSent />} />
          <Route path="/auth/activate/:token" element={<AccountActivate />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/access-account/:token" element={<AccessAccount />} />
          <Route path="/dashboard" element={<Dashboard/>} />

        </Routes>
      </AuthProvider>
        
    </BrowserRouter>

    
  );
}