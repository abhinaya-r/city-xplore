import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Header from "../components/header";
import landingImage from "../images/landingImage.png";
import { Link } from "react-router-dom";

const About = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const buttonStyle = {
    color: "white",
    backgroundColor: "#B6DEBC",
    fontFamily: "Manrope, sans-serif",
    paddingTop: "3px",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "3px",
    fontWeight: "bold",
    textTransform: "none",
    minWidth: "239px",
    minHeight: "58px",
    fontSize: "24px",
  };

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
  };

  const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "#919E6A",
    fontSize: "30px",
    paddingBottom: "0px",
    textAlign: "left",
    fontWeight: "bold",
  };

  const imageStyle = {
    width: "45%",
    height: "75%",
    position: "absolute",
    right: 0,
    top: 100,
  };

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
            color: "#919E6A",
            fontSize: "30px",
            paddingTop: "30px",
            paddingBottom: "10px",
            textAlign: "left",
          }}
        >
          To begin, go to "My Dashboard" and create a new itinerary. You can
          also browse through past itineraries and favorited activities.We hope
          you enjoy!
        </Typography>
      </Card>
    </div>
  );
};

export default About;
