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
import isEmail from "validator/lib/isEmail";

// Set Base URI for axios call
let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

// Function to get user token
async function getToken(credentials) {
  return fetch(`${uriBase}/users/token?email=${credentials.email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .catch((err) => console.error("loginUser error: ", err));
}

// Styling
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

// Page to take a user's email to send them an email to reset password
const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = React.useState("");

  const [isEmailValid, setEmailIsValid] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const helperTestClasses = helperTextStyles();

  // Checks if email is in valid format
  const handleEmail = (event) => {
    const val = event.target.value;
    if (isEmail(val)) {
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
    setEmail(val);
  };

  // Function handler to manage submitting an email address
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken({
      email,
    });
    fetch(`${uriBase}/api/forgotpassword?token=${token.token}&email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .catch((err) => console.error("loginUser error: ", err));
    window.location.href = "/checkemail";
  };

  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "35%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "50%",
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
              Forgot Password
            </Typography>
          </Grid>
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
                fontSize: "20px",
                paddingBottom: "30px",
                textAlign: "center",
                textTransform: "none",
              }}
            >
              Enter your email to recieve a link to reset your password:
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
                Submit
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

export default ForgotPassword;
