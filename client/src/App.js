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
// import RecommendationPage from "./pages/recommendations"
// import AboutPage from "./pages/about"

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

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
        {/* <Route path="/getrecommendations"
              element={<RecommendationPage/>}/>
            <Route exact path="/about" element={<AboutPage/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
