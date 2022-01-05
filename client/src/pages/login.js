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
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import isEmail from "validator/lib/isEmail";
import { letterSpacing } from "@mui/system";

const crypto = require("crypto");

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

async function loginUser(credentials) {
  console.log("credentials:", credentials);
  console.log(uriBase);
  return fetch(
    `${uriBase}/users?email=${credentials.email}&password=${credentials.password_hash}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((data) => data.json())
    .catch((err) => console.error("loginUser error: ", err));
}
// async function loginUser(credentials) {
//   console.log("credentials:", credentials);
//   return fetch(
//     `http://localhost:3001/users?email=${credentials.email}&password=${credentials.password_hash}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   )
//     .then((data) => data.json())
//     .catch((err) => console.error("loginUser error: ", err));
// }

const helperTextStyles = makeStyles(() => ({
  root: {
    margin: "0px",
    color: "#ACD7AB",
    border: "#ACD7AB",
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      paddingBottom: "0px",
      backgroundColor: "#ACD7AB",
      border: "0px #ACD7AB",
      disableUnderline: true,
      fontWeight: 400,
      color: "red",
    },
  },
}));
// async function loginUser(credentials) {
//   return fetch("http://localhost:3001/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

const Login = ({ setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  // const [isValid, setIsValid] = React.useState(false);

  const [isEmailValid, setEmailIsValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [isPasswordValid, setPasswordIsValid] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const password_hash = crypto.createHash("md5").update(password).digest("hex");
  // password = password_hash;

  const helperTestClasses = helperTextStyles();

  const handleEmail = (event) => {
    const val = event.target.value;
    if (isEmail(val)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmail(val);
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

  const handleSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    try {
      const token = await loginUser({
        email,
        password_hash,
      });
      console.log(token);
      setToken(token);
      window.location.href = "/homepage";
    } catch {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "35%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "54%",
    textAlign: "center",
    justifyAlign: "center",
    padding: "60px",
    backgroundColor: "#ACD7AB",
  };

  const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "white",
    fontSize: "18px",
    paddingTop: "0px",
    paddingBottom: "0px",
    textAlign: "left",
  };

  const textfieldStyle = {
    paddingTop: "0px",
    paddingBottom: "0px",
    background: "#FFFFFF",
    border: "#FFFFFF",
    borderRadius: "10px",
    width: "100%",
  };

  const gridStyle = {
    border: "0px",
    marginTop: "-10px",
    marginBottom: "-20px",
    marginRight: "0px",
    width: "100%",
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Header />
      <Card style={cardStyle}>
        <Grid container spacing={0} style={{ display: "block" }}>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "-30px",
              marginBottom: "0px",
              paddingTop: "0px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "40px",
                paddingBottom: "30px",
                textAlign: "center",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Login
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
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
                variant="outlined"
                size="small"
                margin="none"
                style={textfieldStyle}
                onChange={handleEmail}
                value={email}
                fullWidth
                muifilledinput={{ borderBottomLeftRadius: "0px" }}
                InputProps={{
                  disableUnderline: true,
                  padding: "0px",
                }}
              />
            </Grid>
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
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                border: "0px",
                marginTop: "-50px",
                marginBottom: "-10px",
                justifyAlign: "center",
              }}
            >
              <Button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "orange",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "15px",
                  fontWeight: 600,
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Login
              </Button>
              {errorMessage && (
                <div
                  className="error"
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    paddingBottom: "0px",
                    backgroundColor: "#ACD7AB",
                    color: "red",
                  }}
                >
                  {" "}
                  {errorMessage}{" "}
                </div>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                border: "0px",
                marginTop: "-50px",
                marginBottom: "-10px",
                justifyAlign: "center",
              }}
            >
              <Link
                style={{
                  fontFamily: "Manrope, sans-serif",
                  color: "white",
                  fontSize: "20px",
                  paddingBottom: "30px",
                  textAlign: "center",
                  textTransform: "none",
                }}
                to="/forgotpassword"
              >
                Forgot Password?
              </Link>
            </Grid>
            {/* <Grid item xs={12}>
              <Typography
                style={{
                  fontFamily: "Manrope, sans-serif",
                  color: "white",
                  fontSize: "10px",
                  paddingTop: "10px",
                  paddingBottom: "0px",
                  textAlign: "center",
                }}
              >
                Don't have an account? Sign up
              </Typography>
              <Link
                to="/signup"
                style={{
                  color: "white",
                  font: "Manrope, sans-serif",
                  textDecoration: "none",
                }}
              >
                <Typography
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    color: "white",
                    fontSize: "10px",
                    paddingTop: "10px",
                    paddingBottom: "0px",
                    textAlign: "center",
                  }}
                >
                  here!
                </Typography>
              </Link>
            </Grid> */}
          </form>
        </Grid>
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
