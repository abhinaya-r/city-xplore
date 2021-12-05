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

const Signup = () => {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

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
        <Grid
          container
          spacing={6}
          padding="10px"
          style={{ border: "0px", marginTop: "-20px", marginBottom: "-20px" }}
          columns={2}
        >
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-20px",
            }}
          >
            <Typography
              style={{
                color: "white",
                fontSize: "20px",
                paddingTop: "0px",
                paddingBottom: "0px",
                textAlign: "left",
              }}
            >
              First Name
            </Typography>
            <TextField
              variant="outlined"
              id="filled"
              size= "small"
              margin="none"
              style={{ paddingTop: "0px", paddingBottom: "0px", background: "#FFFFFF",
                border: "#FFFFFF",
                borderRadius:"10px" }}
              muifilledinput={{ borderBottomLeftRadius: "0px" }}
              InputProps={{
                disableUnderline: true,
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-20px",
            }}
          >
            <Typography
              style={{
                color: "white",
                fontSize: "20px",
                paddingTop: "0px",
                paddingBottom: "0px",
                textAlign: "left",
              }}
            >
              Last Name
            </Typography>
            <TextField
              id="filled"
              variant="outlined"
              size= "small"
              margin="none"
              style={{ paddingTop: "0px", paddingBottom: "0px", background: "#FFFFFF",
                border: "#FFFFFF",
                borderRadius:"10px",}}
              muifilledinput={{ borderBottomLeftRadius: "0px" }}
              InputProps={{
                disableUnderline: true,
                padding: "0px",
              }}
            />
          </Grid>
        </Grid>
        <Grid id="second-row" container spacing={0}>
          <Grid
            item
            xs={8}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-15px",
            }}
          >
            <Typography
              style={{
                color: "white",
                fontSize: "20px",
                paddingTop: "0px",
                paddingBottom: "0px",
                textAlign: "left",
              }}
            >
              Email
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-10px",
            }}
          >
            <TextField
              id="filled"
              variant="outlined"
              size= "small"
              margin="normal"
              InputProps={{
                disableUnderline: true,
              }}
              style= {{
                background: "#FFFFFF",
                border: "#FFFFFF",
                borderRadius:"10px",
              }}
            />
          </Grid>
        </Grid>
        <Grid id="third-row" spacing={2} style={{ border: "0px" }}>
          <Grid
            item
            xs={8}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-15px",
            }}
          >
            <Typography
              style={{
                color: "white",
                fontSize: "20px",
                paddingTop: "0px",
                paddingBottom: "0px",
                textAlign: "left",
              }}
            >
              Password
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-50px",
            }}
          >
            <TextField
              id="filled"
              size= "small"
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              InputProps={{
                disableUnderline: true,
              }}
              style= {{
                background: "#FFFFFF",
                border: "#FFFFFF",
                borderRadius:"10px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "0px",
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
                style={{
                  color: "white",
                  backgroundColor: "orange",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
              >
                Sign up
              </Button>
            </Link>
          </Grid>
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

export default Signup;
