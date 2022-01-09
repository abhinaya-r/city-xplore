import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Header from "../components/header2";
import landingImage from "../images/landingImage.png";

// Landing Page for the website, leads user to signup or login page
const LandingPage = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  // Styling
  const buttonStyle = {
    color: "white",
    backgroundColor: "#B6DEBC",
    fontFamily: "Manrope, sans-serif",
    paddingTop: "3px",
    paddingLeft: "30px",
    paddingRight: "30px",
    paddingBottom: "3px",
    marginRight: "10px",
    fontWeight: "bold",
    textTransform: "none",
    minWidth: "239px",
    minHeight: "58px",
    fontSize: "24px",
    justifyContent: "center",
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
    height: "65%",
    textAlign: "center",
    padding: "60px",
    backgroundColor: "white",
    boxShadow: "none",
  };
  const imageStyle = {
    width: "45%",
    height: "75%",
    position: "absolute",
    right: 0,
    top: 100,
  };

  // Handles signup button to redirect to signup page
  const handleSignup = () => {
    window.location.href = "/signup";
  };

  // Renders information on a card
  return (
    <div>
      <Header />
      <Card style={cardStyle}>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "#919E6A",
            fontSize: "55px",
            paddingBottom: "0px",
            textAlign: "left",
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          CityXplore
        </Typography>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "#919E6A",
            fontSize: "35px",
            paddingBottom: "0px",
            textAlign: "left",
            fontStyle: "italic",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          The Future of Fun
        </Typography>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "#919E6A",
            fontSize: "25px",
            paddingBottom: "0px",
            textAlign: "left",
            textAlign: "center",
          }}
        >
          We can help you find the best activities to do in your city. Sign up
          today!
        </Typography>
        <Button style={buttonStyle} onClick={handleSignup}>
          Sign up!
        </Button>
      </Card>
      <img src={landingImage} style={imageStyle} />
    </div>
  );
};

export default LandingPage;
