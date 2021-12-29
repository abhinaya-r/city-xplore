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
import Activity from "../components/activity";

import axios from "axios";

const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return today;
};

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
    axios
      .get("/api/new_itinerary")
      .then((response) => {
        const allActivities = response.data;
        getItinerary(allActivities);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  React.useEffect(() => {
    getNewItinerary();
  }, []);

  const itineraryObjects = [];

  if (itinerary) {
    console.log(itinerary);
    for (const [index, value] of itinerary.entries()) {
      itineraryObjects.push(
        <Activity
          name={!itinerary ? "Loading..." : value["name"]}
          rating={!itinerary ? "" : value["rating"]}
          address={!itinerary ? "" : value["address"]}
        />
      );
    }
  }

  return (
    <div style={{ height: "100vh" }} style={background}>
      <Header />
      <Card style={cardStyle}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            {itineraryObjects}
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <Button
              style={{
                color: "white",
                backgroundColor: "#919E6A",
                fontFamily: "Manrope, sans-serif",
                textAlign: "center",
              }}
            >
              Save Itinerary
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default UserItinerary;
