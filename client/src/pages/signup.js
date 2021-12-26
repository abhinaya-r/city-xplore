import React from "react";
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
  const gender = "female";
  const birthday = "09/30/1999";
  var currentdate = new Date(); 
  var created_on = currentdate.getFullYear()  + "-"
                  + (currentdate.getMonth()+1) + "-" 
                  + currentdate.getDate() + " "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  const password_hash = crypto.createHash("md5").update(password).digest("hex");

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
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "50%",
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
    marginBottom: "-60px",
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
            padding="10px"
            style={{ border: "0px", marginTop: "-20px", marginBottom: "-20px" }}
            columns={2}
          >
            <Grid item xs={6} style={gridStyle}>
              <Typography style={typeStyle}>First Name</Typography>
              <TextField
                variant="outlined"
                id="filled"
                size="small"
                margin="none"
                value={firstName}
                onInput={(e) => setFirstName(e.target.value)}
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
                onInput={(e) => setLastName(e.target.value)}
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
              variant="outlined"
              size="small"
              margin="none"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
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
                // onInput={(e) => setGender(e.target.value)}
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
                onInput={(e) => setPassword(e.target.value)}
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
                onInput={(e) => setConfirmPassword(e.target.value)}
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
            }}
          >
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
