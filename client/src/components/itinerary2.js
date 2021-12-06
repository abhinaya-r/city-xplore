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

import axios from "axios";


const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

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

  const [itinerary, getItinerary] = React.useState(null);

  const getNewItinerary = () => {
    axios.get("/api/new_itinerary")
    .then((response) => {
      const allActivities = response.data;
      getItinerary(allActivities);
    })
    .catch(error => console.error(`Error: ${error}`))
  }

  React.useEffect(() => {
    getNewItinerary();
  }, [])

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
            {getDate()}
          </Typography>
          <Activity name= {!itinerary ? "Loading..." : itinerary[0]['name']} 
          rating="4.5 stars" address="20 W 34th St, New York, NY 10001"/>

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
            {!itinerary ? "Loading..." : itinerary[1]['name']}
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
            {!itinerary ? "Loading..." : itinerary[2]['name']}
          </Box>
        </Grid>
      </Card>
    </div>
  );
};

export default UserItinerary;
