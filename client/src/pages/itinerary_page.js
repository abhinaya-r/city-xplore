import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import { Link } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

let activities = [];
let activitesDisplay = [];

const Recommendations = () => {
  const [address, setAddress] = useState("");
  const [act, setAct] = useState("");
  const [nextPage, setNextPage] = useState("/getitinerary");
  const addRestaurant = () => {
    activities.push("restaurant");
    setAct("restaurant");
    activitesDisplay.push("Restaurant");
    console.log(activities);
  };
  const addBar = () => {
    activities.push("bar");
    setAct("bar");
    activitesDisplay.push("Bar");
    console.log(activities);
  };
  const addMuseum = () => {
    activities.push("museum");
    setAct("museum");
    activitesDisplay.push("Museum");
    console.log(activities);
  };
  const addBakery = () => {
    activities.push("bakery");
    setAct("bakery");
    activitesDisplay.push("Bakery");
    console.log(activities);
  };
  const addTheater = () => {
    activities.push("movie_theater");
    setAct("movie Theater");
    activitesDisplay.push("Movie Theater");
    console.log(activities);
  };
  const addCafe = () => {
    activities.push("cafe");
    setAct("cafe");
    activitesDisplay.push("Cafe");
    console.log(activities);
  };
  const addPark = () => {
    activities.push("park");
    setAct("park");
    activitesDisplay.push("Park");
    console.log(activities);
  };
  const addBookstore = () => {
    activities.push("book_store");
    setAct("book store");
    activitesDisplay.push("Book Store");
    console.log(activities);
  };
  const addAttraction = () => {
    activities.push("tourist_attraction");
    setAct("attraction");
    activitesDisplay.push("Tourist Attraction");
    console.log(activities);
  };

  const createItinerary = () => {
    console.log("create itinerary");

    axios
      .post("api/new_itinerary", { activities: activities, address: address })
      .then((response) => {
        console.log(response.data);
        if (response.data["status"] == "SUCCESS") {
          console.log("success");
          window.location.href = "/itinerary";
          // setNextPage("/itinerary");
          // location.href = "/itinerary";
        }
      });
  };
  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "50%",
    position: "absolute",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "65%",
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#ACD7AB",
  };

  const background = {
    backgroundColor: "#FFF6F1",
  };

  const handleClick = async (e) => {
    console.log("restaurant");
  };

  const buttonStyle = {
    border: "0px",
    marginTop: "-30px",
    marginBottom: "-10px",
    paddingTop: "0px",
  };
  const buttonTextStyle = {
    color: "white",
    backgroundColor: "#E6AA52",
    fontFamily: "Manrope, sans-serif",
    paddingTop: "3px",
    paddingBottom: "3px",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "22px",
  };

  const activityObjects = [];

  console.log(activities);
  for (const [index, value] of activitesDisplay.entries()) {
    activityObjects.push(
      <Typography
        style={{
          fontFamily: "Manrope, sans-serif",
          color: "white",
          fontSize: "20px",
          paddingTop: "0px",
          paddingBottom: "0px",
          textAlign: "center",
        }}
      >
        {value}
      </Typography>
    );
  }

  return (
    <div style={{ height: "100vh" }} style={background}>
      <Header />
      <Card style={cardStyle}>
        <Grid container spacing={0}>
          <Typography
            style={{
              fontFamily: "Manrope, sans-serif",
              color: "white",
              fontSize: "30px",
              paddingTop: "0px",
              paddingBottom: "10px",
              textAlign: "center",
            }}
          >
            Choose one or more of the categories in order:
          </Typography>
          <Grid item xs={4} style={buttonStyle}>
            <Button
              onClick={addRestaurant}
              value={"Restaurants"}
              style={buttonTextStyle}
            >
              Restaurants
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addBar} style={buttonTextStyle}>
              Bars (21+)
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addBakery} style={buttonTextStyle}>
              Bakery
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addMuseum} style={buttonTextStyle}>
              Museum
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addTheater} style={buttonTextStyle}>
              Movie Theater
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addPark} style={buttonTextStyle}>
              Park
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addCafe} style={buttonTextStyle}>
              Cafe
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addBookstore} style={buttonTextStyle}>
              Bookstore
            </Button>
          </Grid>
          <Grid item xs={4} style={buttonStyle}>
            <Button onClick={addAttraction} style={buttonTextStyle}>
              Attraction
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "30px",
                paddingTop: "0px",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              Current List:
            </Typography>
            {activityObjects}
          </Grid>
          <Grid item xs={6}>
            <Grid
              item
              xs={4}
              style={buttonStyle}
              style={{ paddingBottom: "10px" }}
            ></Grid>
            <Grid
              item
              xs={10}
              style={{
                border: "0px",
                marginTop: "-10px",
                marginBottom: "-20px",
                paddingTop: "0px",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Manrope, sans-serif",
                  color: "white",
                  fontSize: "30px",
                  paddingTop: "0px",
                  paddingBottom: "10px",
                  textAlign: "center",
                }}
              >
                Input Address:
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                border: "0px",
                marginTop: "10px",
                marginBottom: "10px",
                paddingTop: "0px",
              }}
            >
              <TextField
                id="filled-basic"
                variant="filled"
                margin="none"
                value={address}
                onInput={(e) => setAddress(e.target.value)}
                style={{ paddingTop: "0px", paddingBottom: "0px" }}
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
              xs={12}
              style={{
                border: "0px",
                marginTop: "-60px",
                marginBottom: "-20px",
                paddingTop: "0px",
              }}
            ></Grid>
            {/* <Link
              to='/itinerary'
              style={{
                color: "white",
                font: "Manrope, sans-serif",
                textDecoration: "none",
              }}
            > */}

            {/* </Link> */}
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={createItinerary}
              as="input"
              type="submit"
              value="Submit"
              style={{
                color: "white",
                backgroundColor: "#919E6A",
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
              Get Itinerary
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Recommendations;
