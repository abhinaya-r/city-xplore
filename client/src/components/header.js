import React from "react";

// material UI imports to create header
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function Header(props) {
  return (
    <div>
      <AppBar style={{ background: "#79C9D6" }}>
        <Toolbar>
          <Typography variant="h5" style={{ font: "Manrope, sans-serif" }}>
            City Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
