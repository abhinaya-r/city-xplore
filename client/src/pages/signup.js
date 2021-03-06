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
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
async function signupUser(credentials) {
  return axios
    .post(`${uriBase}/users`, credentials)
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

// Renders Signup Page
const Signup = ({ setToken }) => {
  // States to hold textfield information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [unhashedPassword, setUnhashedPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  // Adapted from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  // Adapted from https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
  const isValidDate = (dateString) => {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < 1900 || year > 2500 || month == 0 || month > 12) return false;
    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;
    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
  };

  // Adapted from https://stackoverflow.com/questions/10211145/getting-current-date-and-time-in-javascript
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

  // States to hold password data and check if each textfield is valid
  const password_hash = crypto.createHash("md5").update(password).digest("hex");
  const [isEmailValid, setEmailIsValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  password = password_hash;
  const [isFirstNameValid, setFirstNameIsValid] = useState(false);
  const [fnDirty, setFnDirty] = useState(false);
  const [isLastNameValid, setLastNameIsValid] = useState(false);
  const [lnDirty, setLnDirty] = useState(false);
  const [isPasswordValid, setPasswordIsValid] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [isConfirmValid, setConfirmIsValid] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [isBirthdayValid, setBirthdayIsValid] = useState(false);
  const [birthdayDirty, setBirthdayDirty] = useState(false);
  const [isGenderValid, setGenderIsValid] = useState(false);
  const [genderDirty, setGenderDirty] = useState(false);
  const [open, setOpen] = React.useState(false); // Open dialog box in case of error
  let allValid =
    isEmailValid &&
    isLastNameValid &&
    isFirstNameValid &&
    isPasswordValid &&
    isConfirmValid &&
    isBirthdayValid &&
    isGenderValid;

  const helperTestClasses = helperTextStyles();

  // Functions to handle textfield input
  const handleEmail = (event) => {
    const val = event.target.value;
    if (isEmail(val)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmail(val);
  };
  const handleFirstName = (event) => {
    const val = event.target.value;
    if (val.length >= 2) {
      setFirstNameIsValid(true);
    } else {
      setFirstNameIsValid(false);
    }
    setFirstName(val);
  };
  const handleLastName = (event) => {
    const val = event.target.value;
    if (val.length >= 2) {
      setLastNameIsValid(true);
    } else {
      setLastNameIsValid(false);
    }
    setLastName(val);
  };
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
  const handleBirthday = (event) => {
    const val = event.target.value;
    const validateBday = isValidDate(val);
    if (validateBday) {
      setBirthdayIsValid(true);
    } else {
      setBirthdayIsValid(false);
    }
    setBirthday(val);
  };
  const handleGender = (event) => {
    const val = event.target.value;
    console.log("val");
    if (val.length > 0) {
      setGenderIsValid(true);
    } else {
      setGenderIsValid(false);
    }
    setGender(val);
  };
  const handleSubmit = async (e) => {
    console.log("allValid: ", allValid);
    e.preventDefault();
    try {
      const token = await signupUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password_hash,
        birthday: birthday,
        gender: gender,
        created_on: created_on,
      });
      if (allValid) {
        setToken(token);
        console.log(token);
        window.location.href = "/homepage";
      } else {
        if (isFirstNameValid === false) setFnDirty(true);
        if (isLastNameValid === false) setLnDirty(true);
        if (isEmailValid === false) setEmailDirty(true);
        if (isBirthdayValid === false) setBirthdayDirty(true);
        if (isGenderValid === false) setGenderDirty(true);
        if (isPasswordValid === false) setPasswordDirty(true);
        if (isConfirmValid === false) setConfirmDirty(true);
      }
    } catch (err) {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
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

  // Renders signup page
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
          Get Started Today!
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={6}
            style={{ border: "0px", marginTop: "-30px", marginBottom: "-20px" }}
          >
            <Grid item xs={6} style={gridStyle}>
              <Typography style={typeStyle}>First Name</Typography>
              <TextField
                variant="outlined"
                id="filled"
                size="small"
                margin="none"
                value={firstName}
                autoFocus
                onBlur={() => setFnDirty(true)}
                error={fnDirty && isFirstNameValid === false}
                helperText={
                  fnDirty && isFirstNameValid === false
                    ? "Name must at least 2 characters"
                    : ""
                }
                FormHelperTextProps={{ classes: helperTestClasses }}
                onInput={handleFirstName}
                style={textfieldStyle}
                muifilledinput={{
                  borderBottomLeftRadius: "0px",
                }}
                InputProps={{
                  disableUnderline: true,
                  paddingTop: "0px",
                  paddingBottom: "0px",
                  border: "#FFFFFF",
                }}
              />
            </Grid>
            <Grid item xs={6} style={gridStyle}>
              <Typography style={typeStyle}>Last Name</Typography>
              <TextField
                id="filled"
                variant="outlined"
                size="small"
                margin="none"
                value={lastName}
                onBlur={() => setLnDirty(true)}
                error={lnDirty && isLastNameValid === false}
                helperText={
                  lnDirty && isLastNameValid === false
                    ? "Name must at least 2 characters"
                    : ""
                }
                FormHelperTextProps={{ classes: helperTestClasses }}
                onInput={handleLastName}
                style={textfieldStyle}
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                  border: "#FFFFFF",
                  borderRadius: "10px",
                  backgroundColor: "white",
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <Typography style={typeStyle}>Email</Typography>
            <TextField
              id="filled"
              onBlur={() => setEmailDirty(true)}
              error={emailDirty && isEmailValid === false}
              helperText={
                emailDirty && isEmailValid === false
                  ? "Please enter valid email"
                  : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              onInput={handleEmail}
              variant="outlined"
              size="small"
              margin="none"
              value={email}
              style={textfieldStyle}
              fullWidth
              muifilledinput={{ borderBottomLeftRadius: "0px" }}
              InputProps={{
                disableUnderline: true,
                padding: "0px",
              }}
            />
          </Grid>
          <Grid id="birthdate-row" container spacing={2}>
            <Grid item xs={6} style={gridStyle}>
              <Typography style={typeStyle}>Birthday (mm/dd/yyyy)</Typography>
              <TextField
                id="date"
                variant="outlined"
                fullWidth
                size="small"
                margin="none"
                value={birthday}
                onBlur={() => setBirthdayDirty(true)}
                error={birthdayDirty && isBirthdayValid === false}
                helperText={
                  birthdayDirty && isBirthdayValid === false
                    ? "Please enter valid birthday"
                    : ""
                }
                FormHelperTextProps={{ classes: helperTestClasses }}
                onInput={handleBirthday}
                style={textfieldStyle}
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                  inputProps: { max: getDate() },
                }}
              />
            </Grid>
            <Grid item xs={6} style={gridStyle}>
              <Typography style={typeStyle}>Gender</Typography>
              <TextField
                select
                fullWidth
                variant="outlined"
                size="small"
                margin="none"
                onBlur={() => setGenderDirty(true)}
                error={genderDirty && isGenderValid === false}
                helperText={
                  genderDirty && isGenderValid === false
                    ? "Please select gender"
                    : ""
                }
                FormHelperTextProps={{ classes: helperTestClasses }}
                onChange={handleGender}
                style={textfieldStyle}
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                }}
              >
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"nonbinary"}>Nonbinary</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid id="third-row" container spacing={2} style={{ border: "0px" }}>
            <Grid item xs={6} style={gridStyle}>
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
              xs={6}
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
                Sign up
              </Button>
            ) : (
              <Tooltip title="Please complete form">
                <Button
                  type="button"
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
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                style: {
                  backgroundColor: "#ACD7AB",
                  boxShadow: "none",
                  color: "white",
                },
              }}
            >
              <DialogTitle id="alert-dialog-title" style={{ color: "white" }}>
                {"Email associated with account"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  id="alert-dialog-description"
                  style={{ color: "white" }}
                >
                  Do you already have an account associated with this email
                  address? If so, please log in.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} style={{ color: "white" }}>
                  Close
                </Button>
                <Button
                  onClick={handleClose}
                  style={{ backgroundColor: "orange", color: "white" }}
                  autoFocus
                >
                  <Link
                    to="/login"
                    style={{
                      color: "white",
                      font: "Manrope, sans-serif",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </Link>
                </Button>
              </DialogActions>
            </Dialog>
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

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Signup;
