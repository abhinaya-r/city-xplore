import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export default function SimpleMenu() {
  return (
    <div>
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
      <Tooltip title="Log in" style={{ color: "white" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button style={{ color: "white" }}>Log in</Button>
        </Link>
      </Tooltip>
      <Tooltip title="Sign up" style={{ color: "white" }}>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button style={{ color: "white" }}>Sign up</Button>
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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button style={{ color: "white" }}>Sign out</Button>
      </Link>
    </div>
  );
}
