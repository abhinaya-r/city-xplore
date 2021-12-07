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

// function setToken(userToken) {
//   localStorage.setItem("token", JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = localStorage.getItem("token");
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token;
// }

function PrivateOutlet() {
  const auth = useToken();
  console.log("auth", auth);
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  // const [token, setToken] = useState();
  const [data, setData] = React.useState(null);
  const { token, setToken } = useToken();

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
  // console.log(data);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<PrivateOutlet />}>
          <Route element={<DashboardPage />} />
        </Route>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/getitinerary" element={<ItineraryPage />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/itinerary" element={<UserItineraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
