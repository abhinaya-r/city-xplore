import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header2";
import { useState } from "react";
import PropTypes from "prop-types";
import Tooltip from "@mui/material/Tooltip";

const axios = require("axios");
const crypto = require("crypto");

// Set Base URI for axios call
let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

// Styling
const helperTextStyles = makeStyles(() => ({
  root: {
    margin: "0px",
    color: "#ACD7AB",
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      paddingBottom: "0px",
      backgroundColor: "#ACD7AB",
      color: "red",
    },
  },
}));

// Function to change password
async function changePassword(credentials) {
  var token = window.location.search.split("?")[1].split("=")[1];
  axios
    .post(`${uriBase}/users/changepassword`, {
      token: token,
      password: credentials.password,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));

  window.location.href = "/login";
}

// Page to Reset Password
const ResetPassword = ({ setToken }) => {
  // States to hold password data and whether the form is valid
  let [password, setPassword] = useState("");
  const [unhashedPassword, setUnhashedPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  const password_hash = crypto.createHash("md5").update(password).digest("hex");
  password = password_hash;
  const [isPasswordValid, setPasswordIsValid] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [isConfirmValid, setConfirmIsValid] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const [open, setOpen] = React.useState(false);

  let allValid = isPasswordValid && isConfirmValid;

  const helperTestClasses = helperTextStyles();

  const handlePassword = (event) => {
    const val = event.target.value;
    if (val.length >= 8) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
    setPassword(val);
    setUnhashedPassword(val);
  };

  const handleConfirm = (event) => {
    const val = event.target.value;
    if (unhashedPassword === val) {
      setConfirmIsValid(true);
    } else {
      setConfirmIsValid(false);
    }
    setConfirmPassword(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await changePassword({
        password: password_hash,
      });

      if (allValid) {
        setToken(token);
        window.location.href = "/dashboard";
      } else {
        if (isPasswordValid === false) setPasswordDirty(true);
        if (isConfirmValid === false) setConfirmDirty(true);
      }
    } catch (err) {}
  };

  // Styling
  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "35%",
    position: "absolute",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "55%",
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#ACD7AB",
    overflow: "auto",
  };
  const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "white",
    fontSize: "18px",
    paddingTop: "0px",
    paddingBottom: "0px",
    textAlign: "left",
  };
  const gridStyle = {
    border: "0px",
    marginTop: "0px",
    marginBottom: "-46px",
  };
  const textfieldStyle = {
    paddingTop: "0px",
    paddingBottom: "0px",
    background: "#FFFFFF",
    border: "#FFFFFF",
    borderRadius: 5,
  };

  // Renders Reset Password Page
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Card style={cardStyle}>
        <Typography
          style={{
            color: "white",
            fontSize: "30px",
            marginTop: "-40px",
            marginBottom: "10px",
            paddingTop: "0px",
            paddingBottom: "0px",
            textAlign: "center",
          }}
        >
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={12}></Grid>
          <Grid id="third-row" container spacing={2} style={{ border: "0px" }}>
            <Grid item xs={12} style={gridStyle}>
              <Typography style={typeStyle}>Password</Typography>
              <TextField
                id="filled"
                variant="outlined"
                size="small"
                type="password"
                name="password"
                margin="none"
                onBlur={() => setPasswordDirty(true)}
                error={passwordDirty && isPasswordValid === false}
                helperText={
                  passwordDirty && isPasswordValid === false
                    ? "Password must be at least 8 characters"
                    : ""
                }
                FormHelperTextProps={{ classes: helperTestClasses }}
                onInput={handlePassword}
                style={textfieldStyle}
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                border: "0px",
                marginTop: "0px",
                marginBottom: "-15px",
              }}
            >
              <Typography style={typeStyle}>Confirm Password</Typography>
              <TextField
                id="filled"
                variant="outlined"
                size="small"
                type="password"
                name="password"
                margin="none"
                onBlur={() => setConfirmDirty(true)}
                error={confirmDirty && isConfirmValid === false}
                helperText={
                  confirmDirty && isConfirmValid === false
                    ? "Password mismatch"
                    : ""
                }
                FormHelperTextProps={{ classes: helperTestClasses }}
                onInput={handleConfirm}
                style={textfieldStyle}
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                }}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "-70px",
              marginBottom: "-70px",
              justifyAlign: "center",
              paddingTop: "10px",
            }}
          >
            {allValid === true ? (
              <Button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "orange",
                  fontFamily: "Manrope, sans-serif",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
                error={allValid === false}
              >
                Submit
              </Button>
            ) : (
              <Tooltip title="Please complete form">
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    color: "white",
                    backgroundColor: "grey",
                    fontFamily: "Manrope, sans-serif",
                    paddingLeft: "40px",
                    paddingRight: "40px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Sign up
                </Button>
              </Tooltip>
            )}
          </Grid>
        </form>
      </Card>
      <img
        src={loginImage}
        style={{
          width: "35%",
          height: "45%",
          position: "absolute",
          right: 70,
          top: 250,
        }}
      />
    </div>
  );
};

ResetPassword.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default ResetPassword;
