// client/src/App.js

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import LandingPage from "./pages/landing_page";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile_page"
import ItineraryPage from "./pages/itinerary_page";
import UserItineraryPage from "./pages/user_itinerary_page";
import AboutPage from "./pages/about";

// function setToken(userToken) {
//   sessionStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

// const db = require('../../database/models/index.js');

function App() {
  const [data, setData] = React.useState(null);

  // const token = getToken();
  // if (!token) {
  //   return <LoginPage setToken={setToken} />;
  // }

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);

  // <div className="App">
  //   <header className="App-header">
  //     <img src={logo} className="App-logo" alt="logo" />
  //     <p>{!data ? "Loading..." : data}</p>
  //   </header>
  // </div>
  console.log(data);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/getitinerary" element={<ItineraryPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/itinerary" element={<UserItineraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
