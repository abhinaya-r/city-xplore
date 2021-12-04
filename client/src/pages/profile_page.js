import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import { Link } from "react-router-dom";


const ProfilePage = () => {
  const [alignment, setAlignment] = React.useState('');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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

   const typeStyle = {
    fontFamily: "Manrope, sans-serif",
    color: "#FFFFFF",
    fontSize: "20px",
    paddingTop: "10px",
    paddingBottom: "0px",
    textAlign: "left",
  };

  return (
    <div style={{ height: "100vh" }} style={background}>
      <Header />
      <Card style={cardStyle}>
        <Typography style={typeStyle}>
          Name: Ishani Kulkarni 
        </Typography>
        <Typography style={typeStyle}>
          Email: isk@princeton.edu
        </Typography>
        <Typography style={typeStyle}>
          Subscription Type: Free Trial
        </Typography>
        <Grid
          container
          spacing={0}
          padding="10px"
          style={{ border: "0px", marginTop: "-20px", marginBottom: "-20px" }}
          columns={2}
        >
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-20px",
            }}
          >
        <Button
            style={{
                color: "white",
                backgroundColor: "orange",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "0px",
                paddingBottom: "0px",
                marginBottom: "0px",
                textAlign: "left"
            }}
            >
            Change Subscription Type
        </Button>
        </Grid>
         <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              marginBottom: "-30px",
            }}
          >
        <Button
            style={{
                color: "white",
                backgroundColor: "orange",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "0px",
                paddingBottom: "0px",
                textAlign: "left"
            }}
            >
            Delete Account
        </Button>
        </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default ProfilePage;
