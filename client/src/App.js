// client/src/App.js

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/landing_page";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile_page";
import ItineraryPage from "./pages/itinerary_page";
import UserItineraryPage from "./pages/user_itinerary_page";
import AboutPage from "./pages/about";
import useToken from "./hooks/useToken";
import HomePage from "./pages/homepage";
import ResetPassword from "./pages/resetpassword";
import ForgotPassword from "./pages/forgotpassword";
import CheckEmail from "./pages/checkemail";

function PrivateOutlet() {
  const auth = useToken();
  console.log("auth", auth);
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const [data, setData] = React.useState(null);
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateOutlet />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/getitinerary" element={<ItineraryPage />} />
          <Route exact path="/itinerary" element={<UserItineraryPage />} />
          <Route exact path="/homepage" element={<HomePage />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignupPage setToken={setToken} />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/resetpassword" element={<ResetPassword />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route exact path="/checkemail" element={<CheckEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
