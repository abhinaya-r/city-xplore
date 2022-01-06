import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";

export default function Header(props) {
  const grow = {
    flexGrow: 1,
  };
  const appBar = {
    minWidth: "40%",
    color: "#79C9D6",
  };

  return (
    <div>
      <AppBar style={appBar} style={{ background: "#79C9D6" }}>
        <Toolbar>
          <div>
            <Link
              to="/"
              style={{
                color: "white",
                fontFamily: "Manrope, sans-serif",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h5"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                CityXplore
              </Typography>
            </Link>
          </div>
          <div style={grow} />

          <Tooltip
            title="Log in"
            style={{ color: "white", fontFamily: "Manrope, sans-serif" }}
          >
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button style={{ color: "white" }}>Log in</Button>
            </Link>
          </Tooltip>
          <Tooltip
            title="Sign up"
            style={{ color: "white", fontFamily: "Manrope, sans-serif" }}
          >
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <Button
                style={{ color: "white", fontFamily: "Manrope, sans-serif" }}
              >
                Sign up
              </Button>
            </Link>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
