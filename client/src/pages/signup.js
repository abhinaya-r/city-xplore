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

const Login = () => {
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

  const textboxStyle = {
    paddingTop: "0px", 
    paddingBottom: "0px", 
    background: "#FFFFFF",
    border: "#FFFFFF",
    borderRadius:"10px",
    paddingTop: "0px", 
    paddingBottom: "0px"
  }
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Card style={cardStyle}>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "white",
            fontSize: "30px",
            marginTop: "-40px",
            marginBottom: "20px",
            paddingTop: "0px",
            paddingBottom: "0px",
            textAlign: "center",
            fontWeight: "bold"
          }}
        >
          Get Started Today!
        </Typography>
        <Grid
          container
          spacing={6}
          padding="5px"
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
                fontFamily: "Manrope, sans-serif"
              }}
            >
              First Name
            </Typography>
            <TextField
              variant="outlined"
              // label="Outlined"
              id="filled"
              // value={this.state.name}
              // onChange={this.handleChange("name")}
              margin="none"
              style={textboxStyle}
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
              margin="none"
              style={textboxStyle}
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
            xs={12}
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
              Email
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-10px",
            }}
          >
            <TextField
              id="filled"
              // label="Outlined"
              variant="outlined"
              // value={this.state.name}
              // onChange={this.handleChange("name")}
              margin="normal"
              style={textboxStyle}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
        </Grid>
        <Grid id="third-row" spacing={2} style={{ border: "0px" }}>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "10px",
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
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-25px",
            }}
          >
            <TextField
              id="filled"
              type="password"
              name="password"
              // label="Outlined"
              variant="outlined"
              // value={this.state.name}
              // onChange={this.handleChange("name")}
              margin="normal"
              style={textboxStyle}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
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
                  backgroundColor: "#E6AA52",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  fontWeight: "bold",
                  textTransform: 'none',
                  minWidth: "239px",
                  minHeight: "58px",
                  fontSize: "24px"
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

export default Login;
