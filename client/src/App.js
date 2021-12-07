// client/src/App.js

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import LandingPage from "./pages/landing_page";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile_page";
import ItineraryPage from "./pages/itinerary_page";
import UserItineraryPage from "./pages/user_itinerary_page";
import AboutPage from "./pages/about";
import useFindUser from "./hooks/useFindUser";
import { UserContext } from "./hooks/UserContext";
import useAuth from "./hooks/useAuth";
// import PrivateRoute from "./pages/PrivateRoute";

function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const [data, setData] = React.useState(null);
  const { user, setUser, isLoading } = useFindUser();

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const token = getToken();
  // if (!token) {
  //   <BrowserRouter>
  //     <Switch>
  //       return <LoginPage setToken={setToken} />;
  //     </Switch>
  //   </BrowserRouter>;
  // }
  // if (!token) {
  //   return (
  //      <nav>
  //       <Link to="me">My Profile</Link>
  //     </nav>
  //   );
  // }

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
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          {/* <PrivateRoute path="/" element = {<LandingPage/>} token = {token}/> */}
          <Route path="/dashboard" element={<PrivateOutlet />}>
            <Route element={<DashboardPage />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/getitinerary" element={<ItineraryPage />} />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/itinerary" element={<UserItineraryPage />} />
        </UserContext.Provider>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
