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
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  console.log("credentials:", credentials)
  return fetch(`http://localhost:3001/users?email=${credentials.email}&password=${credentials.password}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

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
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    console.log(token);
    setToken(token);
    window.location.href = "/dashboard";
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
  };

  const gridStyle = {
    border: "0px",
    marginTop: "-10px",
    marginBottom: "-20px",
  };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Card style={cardStyle}>
        <Grid container spacing={0}>
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
                variant="outlined"
                size="small"
                fullWidth
                style={textfieldStyle}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={typeStyle}>Password</Typography>
              <TextField
                id="filled"
                variant="outlined"
                size="small"
                type="password"
                name="password"
                margin="none"
                fullWidth
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
                  paddingLeft: "50px",
                  paddingRight: "50px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Login
              </Button>
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
