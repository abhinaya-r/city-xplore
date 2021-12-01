import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const UserItinerary = () => {
  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "50%",
    position: "absolute",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#ACD7AB",
  };

  const background = {
    backgroundColor: "#FFF6F1",
  };
  return (
    <div style={{ height: "100vh" }} style={background}>
      <Header />
      <Card style={cardStyle}>
        <Grid container spacing={0}>
          <Typography
            style={{
              color: "white",
              fontSize: "40px",
              fontWeight: "bold",
              marginBottom: "30px",
              marginTop: "-30px",
              justifyContent: "center",
            }}
          >
            {" "}
            Date
          </Typography>
          <Box
            component="span"
            sx={{ display: "block", bgcolor: "#FFF6F1", borderRadius: "10px" }}
            style={{
              width: "100%",
              color: "#919E6A",
              fontSize: "25px",
              fontWeight: "bold",
              padding: "20px",
              marginBottom: "25px",
            }}
          >
            Activity 1
          </Box>
          <Box
            component="span"
            sx={{ display: "block", bgcolor: "#FFF6F1", borderRadius: "10px" }}
            style={{
              width: "100%",
              color: "#919E6A",
              fontSize: "25px",
              fontWeight: "bold",
              padding: "20px",
              marginBottom: "25px",
            }}
          >
            Activity 2
          </Box>
          <Box
            component="span"
            sx={{ display: "block", bgcolor: "#FFF6F1", borderRadius: "10px" }}
            style={{
              width: "100%",
              color: "#919E6A",
              fontSize: "25px",
              fontWeight: "bold",
              padding: "20px",
              marginBottom: "25px",
            }}
          >
            Activity 3
          </Box>
        </Grid>
      </Card>
    </div>
  );
};

export default UserItinerary;
