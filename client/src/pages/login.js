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

// async function loginUser(credentials) {
//   return fetch("http://localhost:3001/api", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(credentials),
//   }).then((data) => data.json());
// }

const Login = ({ setToken }) => {
  // const [username, setUserName] = useState();
  // const [password, setPassword] = useState();

  // const handleSubmit = async (e) => {
  //   console.log("submitting");
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password,
  //   });
  //   console.log(token);
  //   setToken(token);
  // };
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
    padding: "60px",
    backgroundColor: "#ACD7AB",
  };

  const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "white",
    fontSize: "20px",
    paddingTop: "0px",
    paddingBottom: "0px",
    textAlign: "left",
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
              }}
            >
              Login
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              border: "0px",
              marginTop: "-10px",
              marginBottom: "0px",
              paddingTop: "0px",
            }}
          >
            <Typography style={typeStyle}>Email</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="filled"
              variant="outlined"
              size="small"
              // onChange={(e) => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography style={typeStyle}>Password</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              variant="outlined"
              size="small"
              type="password"
              name="password"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Link
              to="/dashboard"
              style={{
                color: "white",
                font: "Manrope, sans-serif",
                textDecoration: "none",
              }}
            >
              <Button
                as="input"
                type="submit"
                value="Submit"
                style={{
                  color: "white",
                  backgroundColor: "orange",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
              >
                Login
              </Button>
            </Link>
          </Grid>
          {/* <Grid item xs={8}>
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
              Don't have an account? Sign up here!
            </Typography>
          </Grid> */}
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

export default Login;
