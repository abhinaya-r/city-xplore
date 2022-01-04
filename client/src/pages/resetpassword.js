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
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import { MenuItem } from "@material-ui/core";
import validator from "validator";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const axios = require("axios");
const crypto = require("crypto");

// async function signupUser(credentials) {
//   return fetch("http://localhost:3001/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }
let uriBase = 'http://localhost:3000';
if (process.env.NODE_ENV == 'production') {
  uriBase = 'https://city-xplore.herokuapp.com'
} else if (process.env.NODE_ENV == 'prod-test') {
  uriBase = 'https://test-xplore.herokuapp.com'
}

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
async function signupUser(credentials) {
  // let axiosConfig = {
  //   headers: {
  //     "Content-Type": "application/json;charset=UTF-8",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // };
  console.log("signup credentials: ", credentials.toString());
  // return fetch(`http://localhost:3000/users`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: credentials,
  // }).then((data) => {
  //   console.log("response data: ", data);
  //   data.json()
  // });

  return axios
    .post(`${uriBase}/users`, credentials)
    .then((response) => response.data)
    .catch((error) => console.error(error));
  // return axios
  // .post("http://localhost:3001/users", credentials)
  // .then((response) => response.data);
}

const ResetPassword = ({ setToken }) => {
  let [password, setPassword] = useState("");
  const [unhashedPassword, setUnhashedPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  // if (unhashedPassword != confirmPassword) {
  //   console.log("PASSWORDS DO NOT MATCH");
  //   console.log("unhashedPassword: ", unhashedPassword);
  //   console.log("confirmPassword: ", confirmPassword);
  // }

  var currentdate = new Date();
  var created_on =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1) +
    "-" +
    currentdate.getDate() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  const password_hash = crypto.createHash("md5").update(password).digest("hex");
  password = password_hash;
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isPasswordValid, setPasswordIsValid] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [isConfirmValid, setConfirmIsValid] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const [open, setOpen] = React.useState(false);

  let allValid =
    isPasswordValid &&
    isConfirmValid;

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
    console.log("allValid: ", allValid);
    e.preventDefault();
    try {
      const token = await signupUser({
        password: password_hash
      });

      if (allValid) {
        setToken(token);
        console.log(token);
        window.location.href = "/dashboard";
      } else {
        if (isPasswordValid === false) setPasswordDirty(true);
        if (isConfirmValid === false) setConfirmDirty(true);
      }
    } catch (err) {
      setOpen(true);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleSubmit = async (e) => {
  //   console.log("submitting");
  //   e.preventDefault();
  //   const token = await signupUser({
  //     email,
  //     password,
  //   });
  //   console.log(token);
  //   setToken(token);
  //   window.location.href = "/dashboard";
  // };

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

  const defaultValues = {
    eventDate: null,
  };

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
          <Grid
            container
            spacing={12}
            
        >
          </Grid>
        
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
