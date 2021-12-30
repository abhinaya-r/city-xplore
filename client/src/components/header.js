import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function Header(props) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState();

  const grow = {
    flexGrow: 1,
  };
  const appBar = {
    minWidth: "40%",
    color: "#79C9D6",
  };

  const handleSignout = () => {
    console.log("signing out");
    localStorage.clear();
    window.location.href = "/";
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    menu: {
      "& .MuiPaper-root": {
        backgroundColor: "#79C9D6",
      },
    },
  }));
  const classes = useStyles();

  const handleDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleAbout = () => {
    window.location.href = "/about";
  };

  const handleProfile = () => {
    window.location.href = "/profile";
  };
  const handleItinerary = () => {
    window.location.href = "/getitinerary";
  };
  return (
    <div>
      <AppBar style={appBar} style={{ background: "#79C9D6" }}>
        <Toolbar>
          <div>
            <Link
              to="/homepage"
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

          <Tooltip title="Menu">
            <IconButton
              onClick={handleClickOpen}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <MenuIcon sx={{ color: "white" }}></MenuIcon>
            </IconButton>
          </Tooltip>
          <Menu
            open={open}
            sx={{ mt: "40px" }}
            onClose={handleClose}
            className={classes.menu}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={handleAbout} style={{ color: "white" }}>
              About
            </MenuItem>
            <MenuItem onClick={handleDashboard} style={{ color: "white" }}>
              My Dashboard
            </MenuItem>
            <MenuItem onClick={handleProfile} style={{ color: "white" }}>
              My Profile
            </MenuItem>
            <MenuItem onClick={handleItinerary} style={{ color: "white" }}>
              Create Itinerary
            </MenuItem>
            <MenuItem onClick={handleSignout} style={{ color: "white" }}>
              Sign out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}
