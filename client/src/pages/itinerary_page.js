import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import { Link } from "react-router-dom";

import axios from "axios";


let activities = []


const Recommendations = () => {
  const addRestaurant = () => {
    activities.push("restaurant");
    console.log(activities);
  }
  const addBar = () => {
    activities.push("bar");
    console.log(activities);
  }
  const addMuseum = () => {
    activities.push("museum");
    console.log(activities);
  }
  const addDessert = () => {
    activities.push("bakery");
    console.log(activities);
  }
  const createItinerary = () => {
    console.log("create itinerary")
    const activityList = new FormData();

    activities.forEach((item) => {
        activityList.append('activities[]', item);
    });
    axios.post("/api/new_itinerary", activities)
    .then((response) => {
     console.log(response.data);
    });
  }
  const cardStyle = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "70px",
    left: "50%",
    position: "absolute",
    top: "55%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "60%",
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#ACD7AB",
  };

  const background = {
    backgroundColor: "#FFF6F1",
  };

  const handleClick = async (e) => {
    console.log("restaurant");
  };
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
              paddingBottom: "10px",
              textAlign: "center",
            }}
          >
            Choose one or more of the categories in order:
          </Typography>

          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
              onClick={addRestaurant}
              value={"Restaurants"}
              style={{
                color: "white",
                  backgroundColor: "#E6AA52",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  fontWeight: "bold",
                  textTransform: 'none',
                  minWidth: "239px",
                  minHeight: "58px",
                  fontSize: "24px"
              }}
            >
              Restaurants
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
            onClick={addBar}
              style={{
                color: "white",
                  backgroundColor: "#E6AA52",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  fontWeight: "bold",
                  textTransform: 'none',
                  minWidth: "239px",
                  minHeight: "58px",
                  fontSize: "24px"
              }}
            >
              Bars (21+)
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-5px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
            onClick={addDessert}
              style={{
                color: "white",
                backgroundColor: "#E6AA52",
                fontFamily: "Manrope, sans-serif",
                paddingTop: "3px",
                paddingBottom: "3px",
                fontWeight: "bold",
                textTransform: 'none',
                minWidth: "239px",
                minHeight: "58px",
                fontSize: "24px"
              }}
            >
              Desserts
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-5px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Button
            onClick={addMuseum}
              style={{
                color: "white",
                  backgroundColor: "#E6AA52",
                  fontFamily: "Manrope, sans-serif",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                  fontWeight: "bold",
                  textTransform: 'none',
                  minWidth: "239px",
                  minHeight: "58px",
                  fontSize: "24px"
              }}
            >
              Museums
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "-20px",
              paddingTop: "0px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                paddingTop: "30px",
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
              marginTop: "20px",
              marginBottom: "10px",
              paddingTop: "0px",
            }}
          >
            <TextField
              id="filled-basic"
              variant="filled"
              margin="none"
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
          >
            <Link
              to="/itinerary"
              style={{
                color: "white",
                font: "Manrope, sans-serif",
                textDecoration: "none",
              }}
            >
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
                  textTransform: 'none',
                  minWidth: "239px",
                  minHeight: "58px",
                  fontSize: "24px"
                }}
              >
                Get Itinerary
              </Button>
            </Link>
          </Grid>
          {/* </Form> */}
        </Grid>
      </Card>
    </div>
  );
};

export default Recommendations;
