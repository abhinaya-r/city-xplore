import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "../components/header";
import Itinerary from "../components/itineraryDashboard";
import Activity from "../components/activityDashboard";
import { Link } from "react-router-dom";
import axios from "axios";
import { letterSpacing } from "@mui/system";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    margin: "10px",
  },
  gridList: {
    flexWrap: "nowrap",
    // position: "absolute",
  },
  gridListTile: {
    position: "relative",
    display: "block", // In case it's not rendered with a div.
  },
}));

const Mainpage = () => {
  const [pastItineraries, setPastItineraries] = React.useState(null);
  const classes = useStyles();

  const cardStyle = {
    backgroundColor: "#ACD7AB",
    padding: "20px",
    // marginBottom: "20px",
    // width: "25%",
    // height: "25%",
  };

  const getPastItineraries = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    let url = `${uriBase}/itineraries?token=${tk.token}`;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        console.log("response:", response);
        setPastItineraries(response.data);
      })
      .catch((error) => console.error(`Error past itineraries: ${error}`));
  };

  const getFavoritedActivities = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    let url = `${uriBase}/favorited?token=${tk.token}`;
    console.log(url);
    axios
      .get(url)
      .then((response) => {
        console.log("response:", response);
        setPastItineraries(response.data);
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

  React.useEffect(() => {
    getPastItineraries();
  }, []);

  let activityObjects = [];
  let pastItineraryObjects = [];

  if (pastItineraries) {
    console.log("past itineraries reverse", pastItineraries);

    for (const [indexItin, valueItin] of pastItineraries.reverse().entries()) {
      console.log("value", valueItin["itinerary"]);
      let date = valueItin["date"].split("T");
      activityObjects.push(
        <Typography
          style={{
            font: "Manrope, sans-serif",
            color: "white",
            textAlign: "center",
            paddingBottom: "10px",
            fontSize: "20px",
          }}
        >
          {date[0]}
        </Typography>
      );
      for (const [indexAct, valueAct] of valueItin["itinerary"].entries()) {
        activityObjects.push(
          <Activity
            name={valueAct["name"]}
            rating={valueAct["rating"]}
            address={valueAct["address"]}
          />
        );
      }

      pastItineraryObjects.push(
        <GridListTile
          classes={classes.gridListTile}
          style={{
            margin: "10px",
            height: "100%",
            backgroundColor: "#ACD7AB",
          }}
        >
          {activityObjects}
        </GridListTile>
      );
      activityObjects = [];
    }
  }

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
        <Grid
          item
          xs={12}
          style={{
            paddingTop: "0px",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          <GridList cols={3} className={classes.gridList}>
            {pastItineraryObjects}
          </GridList>
        </Grid>
      </Grid>
      {/* <Grid container justifyContent="center" spacing={3}>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
          }}
        >
          <Typography variant="h5" style={typeStyle}>
            Favorited Activities:
          </Typography>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default Mainpage;
