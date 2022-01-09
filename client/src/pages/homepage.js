import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import { Link } from "react-router-dom";

// Homepage for when the user logs in, to help guide them through the website
const HomePage = () => {
  // Styling
  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "35%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "35%",
    height: "40%",
    textAlign: "center",
    justifyAlign: "center",
    padding: "60px",
    backgroundColor: "#ACD7AB",
  };

  // Renders the website information on a card
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Header />
      <Card style={cardStyle}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              paddingTop: "0px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "40px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Welcome to CityXplore!
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "40px",
              paddingTop: "0px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              Learn more about this website from our{" "}
              <Link
                style={{
                  fontFamily: "Manrope, sans-serif",
                  color: "white",
                  fontSize: "25px",
                  paddingBottom: "30px",
                  textAlign: "center",
                  textTransform: "none",
                }}
                to={"/about"}
              >
                about page!
              </Link>
            </Typography>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              Or, head straight to your{" "}
              <Link
                style={{
                  fontFamily: "Manrope, sans-serif",
                  color: "white",
                  fontSize: "25px",
                  paddingBottom: "30px",
                  textAlign: "center",
                  textTransform: "none",
                }}
                to={"/dashboard"}
              >
                dashboard
              </Link>
            </Typography>
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
          top: 200,
        }}
      />
    </div>
  );
};

export default HomePage;
