import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import SimpleMenu from "./simple_menu";

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
                CityXplore
              </Typography>
            </Link>
          </div>
          <div style={grow} />
          <SimpleMenu></SimpleMenu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
