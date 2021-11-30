import React from "react";

// material UI imports to create header
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SimpleMenu from "./simple_menu";

export default function Header(props) {
  const button = {
    alignItems: "right",
    flex: "1",
  };
  return (
    <div>
      <AppBar position="static" style={{ background: "#79C9D6" }}>
        <Toolbar>
          <div>
            <Typography variant="h5" style={{ font: "Manrope, sans-serif" }}>
              City Explorer
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip title="About" style={{ paddingRight: "10px" }}>
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
