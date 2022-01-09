import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Header from "../components/header";
import { Link } from "react-router-dom";

// About Page to give user more information about the app
const About = () => {
  // Styling
  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderStyle: "none",
    borderWidth: 0,
    width: "70%",
    height: "50%",
    textAlign: "left",
    padding: "60px",
    backgroundColor: "white",
    boxShadow: "none",
    backgroundColor: "#ACD7AB",
    overflow: "auto",
  };

  const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "white",
    fontSize: "25px",
    paddingBottom: "0px",
    textAlign: "left",
    fontWeight: "bold",
  };

  // Renders the information within a scrollable Card
  return (
    <div>
      <Header />
      <Card style={cardStyle}>
        <Typography style={typeStyle}>Welcome to CityXplore!</Typography>
        <Typography style={typeStyle}>
          Whether you are a newcomer to a city, a long-time resident, or a
          visitor, we hope we can help you plan a fun outing!
        </Typography>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "white",
            fontSize: "20px",
            paddingTop: "30px",
            paddingBottom: "10px",
            textAlign: "left",
          }}
        >
          Here's how it works. You can create a new itinerary using the menu in
          the header or by going to your dashboard. When you create a new
          itinerary, you will be asked to fill out an itinerary form. In this
          form, you will select a few categories of activities that you are
          interested in. You will also specify a starting location or city to
          begin your journey. You can optionally provide a price range for the
          activities.
        </Typography>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "white",
            fontSize: "20px",
            paddingTop: "30px",
            paddingBottom: "10px",
            textAlign: "left",
          }}
        >
          Once you click "Create Itinerary", we will generate an itinerary of
          activities for you. If you like the itinerary, you can save it to your
          dashboard. If you like only a part of it, you can "favorite" the
          activities you like and refresh the itinerary to get new suggestions.
          You can also "blacklist" activities by clicking "don't show again",
          and we will make sure not to give you that suggestion again.
        </Typography>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "white",
            fontSize: "20px",
            paddingTop: "30px",
            paddingBottom: "10px",
            textAlign: "left",
          }}
        >
          Finally, you can browse your saved itineraries and favorited
          activities on your dashboard.
        </Typography>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "white",
            fontSize: "20px",
            paddingTop: "30px",
            paddingBottom: "10px",
            textAlign: "left",
          }}
        >
          You'll get the best results in a big city, but you can try with any
          address or city!
        </Typography>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "white",
            fontSize: "20px",
            paddingTop: "30px",
            paddingBottom: "10px",
            textAlign: "center",
          }}
        >
          Ready to get started?{" "}
          <Link
            style={{
              fontFamily: "Manrope, sans-serif",
              color: "white",
              fontSize: "20px",
              paddingBottom: "30px",
              textAlign: "center",
              textTransform: "none",
            }}
            to={"/dashboard"}
          >
            Let's go!
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

export default About;
