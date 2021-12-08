import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Link, Navigate } from "react-router-dom";

export default function SimpleMenu() {
  const handleSignout = () => {
    console.log("signing out");
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Tooltip title="Dashboard" style={{ color: "white" }}>
        <Link
          to="/dashboard"
          style={{
            color: "white",
            font: "Manrope, sans-serif",
            textDecoration: "none",
          }}
        >
          <Button style={{ color: "white" }}>My Dashboard</Button>
        </Link>
      </Tooltip>
      <Tooltip title="About" style={{ color: "white" }}>
        <Link
          to="/about"
          style={{
            color: "white",
            font: "Manrope, sans-serif",
            textDecoration: "none",
          }}
        >
          <Button style={{ color: "white" }}>About</Button>
        </Link>
      </Tooltip>
      <Tooltip title="Profile" style={{ color: "white" }}>
        <Link
          to="/profile"
          style={{
            color: "white",
            font: "Manrope, sans-serif",
            textDecoration: "none",
          }}
        >
          <Button style={{ color: "white" }}>My Profile</Button>
        </Link>
      </Tooltip>
      <Button onClick={handleSignout} style={{ color: "white" }}>
        Sign out
      </Button>
    </div>
  );
}
