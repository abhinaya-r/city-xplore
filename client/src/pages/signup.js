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
import FormHelperText from "@material-ui/core/FormHelperText";

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
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post("/api/signup/", credentials)
    .then((response) => response.data);
}

const Signup = ({ setToken }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  if (password != confirmPassword) {
    console.log("PASSWORDS DO NOT MATCH");
  }

  var currentdate = new Date(); 
  var created_on = currentdate.getFullYear()  + "-"
                  + (currentdate.getMonth()+1) + "-" 
                  + currentdate.getDate() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  const password_hash = crypto.createHash("md5").update(password).digest("hex");
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [isFirstNameValid, setFirstNameIsValid] = useState(false);
  const [fnDirty, setFnDirty] = useState(false);
  const [isLastNameValid, setLastNameIsValid] = useState(false);
  const [lnDirty, setLnDirty] = useState(false);
  const [isPasswordValid, setPasswordIsValid] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [isConfirmValid, setConfirmIsValid] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const helperTestClasses = helperTextStyles();

  const handleEmail = (event) => {
    const val = event.target.value;

    if (isEmail(val)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    setValue(val);
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
  };

  const handleConfirm = (event) => {
    const val = event.target.value;
    console.log("password: ", password);
    console.log("val: ", val);
    if (val === password) {
      setConfirmIsValid(true);
    } else {
      setConfirmIsValid(false);
    }
    setConfirmPassword(val);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signupUser({
      "first_name": firstName,
      "last_name":lastName,
      "email": email,
      "password":password_hash,
      "birthday":birthday,
      "gender":gender,
      "created_on":created_on,
    });
    setToken(token);
    console.log(token);
    window.location.href = "/dashboard";
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
    borderRadius: "10px",
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
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  paddingTop: "0px",
                  paddingBottom: "0px",
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
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} style={gridStyle}>
            <Typography style={typeStyle}>Email</Typography>
            <TextField
              id="filled"
              onBlur={() => setDirty(true)}
              error={dirty && isValid === false}
              helperText={
                dirty && isValid === false ? "Please enter valid email" : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              variant="outlined"
              size="small"
              margin="none"
              value={email}
              onInput={handleEmail}
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
              <Typography style={typeStyle}>Birthday</Typography>
              {/* <DesktopDatePicker
                label="Date desktop"
                inputFormat="MM/dd/yyyy"
                // onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              <TextField
                id="filled"
                variant="outlined"
                size="small"
                margin="none"
                value={birthday}
                onInput={(e) => setBirthday(e.target.value)}
                // onInput={(e) => setLastName(e.target.value)}
                style={textfieldStyle}
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                }}
              />
            </Grid>
            <Grid item xs={6} style={gridStyle}>
              <Typography style={typeStyle}>Gender</Typography>
              <TextField
                id="filled"
                variant="outlined"
                size="small"
                margin="none"
                value={gender}
                onInput={(e) => setGender(e.target.value)}
                style={textfieldStyle}
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                }}
              />
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
                    ? "Password must at least 8 characters"
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
                value={confirmPassword}
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
            }}
          >
            {isValid === true ? (
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
              >
                Sign up
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                disabled
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

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Signup;
