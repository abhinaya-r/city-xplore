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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button style={{ color: "white" }}>Sign out</Button>
      </Link>
    </div>
  );
}
