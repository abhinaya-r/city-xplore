import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Header from "../components/header2";
import landingImage from "../images/landingImage.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
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
    textTransform: 'none',
    minWidth: "239px",
    minHeight: "58px",
    fontSize: "24px"
  };

  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "30%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    borderStyle: "none",
    borderWidth: 0,
    width: "35%",
    height: "50%",
    textAlign: "left",
    padding: "60px",
    backgroundColor: "white",
    boxShadow: "none",
  };

  const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "#919E6A",
    fontSize: "45px",
    paddingBottom: "0px",
    textAlign: "left",
    fontWeight: "bold"
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
        <Typography style={typeStyle}>
          City Explorer helps you find personalized things to do in your city.
        </Typography>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button style={buttonStyle}>Sign up!</Button>
        </Link>
      </Card>
      <img src={landingImage} style={imageStyle} />
    </div>
  );
};

export default LandingPage;
