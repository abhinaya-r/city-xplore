import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "../components/header";
import Itinerary from "../components/itineraryDashboard";
import { Link } from "react-router-dom";
import axios from "axios";

const Mainpage = () => {
  const getPastItineraries = () => {
    let tk = localStorage.getItem("token");
    let token = JSON.parse(tk);
    return axios
      .get(`https://city-xplore.herokuapp.com/itineraries?token=${token}`)
      .then((res) => {
        console.log(res.data);
      });
  };
  const typeStyle = {
    font: "Manrope, sans-serif",
    color: "#919E6A",
    textAlign: "left",
    paddingLeft: "80px",
    paddingTop: "20px",
    fontSize: "30px",
  };

  const handleItineraries = () => {
    console.log("here");
    let itins = [];
    itins = getPastItineraries();
    console.log("past itins: ", itins);
  };

  // const getPastItineraries = () => {
  //   axios
  //     .get("/api/")
  //     .then((response) => {
  //       const allPastItineraries = response.data;
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Grid container justifyContent="center" spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            paddingTop: "10px",
          }}
        >
          <Typography variant="h5" style={typeStyle}>
            Past Itineraries:
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ paddingTop: "0px", paddingLeft: "200px" }}>
          <Itinerary></Itinerary>
        </Grid>
        {/* <Grid item xs style={{ textAlign: "center", paddingTop: "30px" }}>
          <Itinerary></Itinerary>
        </Grid> */}
        <Grid item xs style={{ textAlign: "center", paddingTop: "30px" }}>
          <Link
            to="/getitinerary"
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
                backgroundColor: "#E6AA52",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "3px",
                paddingBottom: "3px",
                fontWeight: "bold",
                textTransform: "none",
                minWidth: "239px",
                minHeight: "58px",
                fontSize: "24px",
              }}
            >
              Create a new Itinerary!
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mainpage;
