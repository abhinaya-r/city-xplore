import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import SimpleMenu2 from "./simple_menu2";

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
              to="/dashboard"
              style={{
                color: "white",
                font: "Manrope, sans-serif",
                textDecoration: "none",
              }}
            >
              <Typography variant="h5" style={{ font: "Manrope, sans-serif" }}>
                City-Xplore
              </Typography>
            </Link>
          </div>
          <div style={grow} />
          <SimpleMenu2></SimpleMenu2>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
