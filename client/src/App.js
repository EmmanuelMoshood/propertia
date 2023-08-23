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
import AdCreate from "./pages/user/ad/AdCreate";
import SellHouse from "./pages/user/ad/AdSellHouse";
import SellLand from "./pages/user/ad/AdSellLand";
import RentLand from "./pages/user/ad/AdRentLand";
import RentHouse from "./pages/user/ad/AdRentHouse";




export default function App() {
  return (
    <BrowserRouter>
      
      <Toaster />
      <AuthProvider>
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate-account" element={<EmailSent />} />
          <Route path="/auth/activate/:token" element={<AccountActivate />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/access-account/:token" element={<AccessAccount />} />
          
          {/* route to be made private */}
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/ad/create" element={<AdCreate/>} />
          <Route path="ad/create/sell/House" element={<SellHouse />} />
          <Route path="ad/create/sell/Land" element={<SellLand />} />
          <Route path="ad/create/rent/House" element={<RentHouse />} />
          <Route path="ad/create/rent/Land" element={<RentLand />} />



        </Routes>
      </AuthProvider>
        
    </BrowserRouter>

    
  );
}