import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "../components/header";
import Itinerary from "../components/itineraryDashboard";
import Activity from "../components/activityDashboard";
import { Link } from "react-router-dom";
import axios from "axios";

let uriBase = "http://localhost:3000";
// if (process.env.NODE_ENV == "production") {
//   uriBase = "https://city-xplore.herokuapp.com";
// } else if (process.env.NODE_ENV == "prod-test") {
//   uriBase = "https://test-xplore.herokuapp.com";
// }

const Mainpage = () => {
  const [pastItineraries, setPastItineraries] = React.useState(null);

  const getPastItineraries = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    let url = `${uriBase}/itineraries?token=${tk.token}`;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => console.error(`Error past itineraries: ${error}`));
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

  React.useEffect(() => {
    getPastItineraries();
  }, []);

  const pastItineraryObjects = [];
  const itineraryObjects = [];

  console.log(pastItineraries);
  // for (const [indexItin, valueItin] of pastItineraries.entries()) {
  //   for (const [indexAct, valueAct] of valueItin.entries()) {
  //     itineraryObjects.push(
  //       <Activity
  //         name={valueAct["name"]}
  //         rating={valueAct["rating"]}
  //         address={valueAct["address"]}
  //       />
  //     );
  //   }
  // }

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Grid container justifyContent="center" spacing={3}>
        <Typography
          variant="h5"
          style={{
            font: "Manrope, sans-serif",
            color: "#919E6A",
            textAlign: "left",
            paddingTop: "20px",
            fontSize: "30px",
          }}
        >
          Your CityXplore Dashboard!
        </Typography>
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: "30px" }}>
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
          <Itinerary
            itinerary={["name1", "name2"]}
            rating={["rating1", "rating2"]}
            address={["address1", "address2"]}
          ></Itinerary>
        </Grid>
        {/* <Grid item xs style={{ textAlign: "center", paddingTop: "30px" }}>
          <Itinerary></Itinerary>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Mainpage;
