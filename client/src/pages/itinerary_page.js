import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Header from "../components/header";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import { ToggleButtonGroup } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

// Arrays to display the activities in the itinerary.
let activities = []; // Used for activity information to send to database
let activitiesDisplay = []; // Used to display the activities cleanly on the itinerary form page

// Set Base URI for axios call
let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

// Styling
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  "& .MuiToggleButtonGroup-grouped": {
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "black",
    "&.Mui-disabled": {
      border: 0,
      color: "white",
    },
  },
}));

const helperTextStyles = makeStyles(() => ({
  root: {
    margin: "0px",
    color: "#ACD7AB",
    border: "#ACD7AB",
  },
  error: {
    "&.MuiFormHelperText-root.Mui-error": {
      paddingBottom: "0px",
      backgroundColor: "#ACD7AB",
      border: "0px #ACD7AB",
      disableUnderline: true,
      color: "red",
    },
  },
}));

// Page with the Itinerary Form
const Recommendations = () => {
  const [address, setAddress] = React.useState("");
  const [act, setAct] = useState(0);
  const [formats, setFormats] = React.useState(() => []);
  const helperTestClasses = helperTextStyles();
  const [isAddressValid, setAddressIsValid] = useState(false);
  const [addressDirty, setAddressDirty] = useState(false);
  const [isSelectedValid, setSelectedIsValid] = useState(false);
  const [selectedDirty, setSelectedDirty] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [radius, setRadius] = useState(30 * 1609);
  const [price, setPrice] = useState(4);
  const [importance, setImportance] = useState("popularity");

  // Function handler to ensure that the address is not empty.
  const handleAddress = (event) => {
    const val = event.target.value;
    if (val) {
      setAddressIsValid(true);
    } else {
      setAddressIsValid(false);
    }
    setAddress(val);
  };

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };

  // Handle each activity button, and add to activities, activitiesDisplay, and
  // setAct() to re-render the page so that it shows up in the list.
  // Also, set the cateogy as valid once the user selects at least one category.
  const addRestaurant = () => {
    activities.push("restaurant");
    activitiesDisplay.push("Restaurant");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addBar = () => {
    activities.push("bar");
    activitiesDisplay.push("Bar");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addMuseum = () => {
    activities.push("museum");
    activitiesDisplay.push("Museum");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addBakery = () => {
    activities.push("bakery");
    activitiesDisplay.push("Bakery");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addTheater = () => {
    activities.push("movie_theater");
    activitiesDisplay.push("Movie Theater");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addCafe = () => {
    activities.push("cafe");
    activitiesDisplay.push("Cafe");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addPark = () => {
    activities.push("park");
    activitiesDisplay.push("Park");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addBookstore = () => {
    activities.push("book_store");
    activitiesDisplay.push("Book Store");
    setAct(act + 1);
    setSelectedIsValid(true);
  };
  const addAttraction = () => {
    activities.push("tourist_attraction");
    activitiesDisplay.push("Tourist Attraction");
    setAct(act + 1);
    setSelectedIsValid(true);
  };

  // Function to delete list of categories
  const deleteList = () => {
    activities = [];
    activitiesDisplay = [];
    setAct(act + 1);
    setSelectedIsValid(false);
  };
  // Handles mile radius and price
  const handleClickRadius = (event) => {
    const myValue = event.target.value;
    setRadius(myValue * 1609);
  };
  const handleClickPrice = (event) => {
    const myValue = event.target.value;
    setPrice(myValue);
  };

  // Creates the itinerary from the form values
  const createItinerary = () => {
    if (isAddressValid && isSelectedValid) {
      let token = localStorage.getItem("token");
      let tk = JSON.parse(token);
      axios
        .get(`${uriBase}/activities/blacklist?token=${tk.token}`)
        .then((res) => {
          let blacklist = res.data;
          sessionStorage.setItem("activities", JSON.stringify(activities));
          sessionStorage.setItem("address", address);
          sessionStorage.setItem("radius", radius);
          sessionStorage.setItem("price", price);
          sessionStorage.setItem("blacklist", JSON.stringify(blacklist));
          sessionStorage.setItem("importance", importance);
          window.location.href = "/itinerary";
        });
    } else {
      if (isAddressValid === false) setAddressDirty(true);
      if (isSelectedValid === false) setSelectedDirty(true);
      setErrorMessage("Please fix form errors");
    }
  };

  // Styling
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
    overflow: "auto",
  };
  const background = {
    backgroundColor: "#FFF6F1",
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
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingRight: "10px",
    paddingLeft: "10px",
    fontWeight: "bold",
    textTransform: "none",
    fontSize: "18px",
  };
  const textfieldStyle = {
    paddingTop: "0px",
    paddingBottom: "0px",
  };

  // Creates activity objects in an array to render later
  const activityObjects = [];
  for (const [index, value] of activitiesDisplay.entries()) {
    activityObjects.push(
      <Typography
        style={{
          fontFamily: "Manrope, sans-serif",
          color: "#919E6A",
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

  // Renders the itinerary form
  return (
    <div style={{ height: "100vh" }} style={background}>
      <Header />
      <Card style={cardStyle}>
        <Typography
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "white",
            fontWeight: 600,
            fontSize: "35px",
            paddingTop: "0px",
            paddingBottom: "50px",
            textAlign: "center",
          }}
        >
          Itinerary Form
        </Typography>
        <Grid container spacing={0} style={{ paddingBottom: "20px" }}>
          <Grid container xs={9} style={buttonStyle}>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                paddingTop: "0px",
                paddingBottom: "0px",
                textAlign: "left",
              }}
            >
              Choose one or more of the categories *
            </Typography>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              {selectedDirty && isSelectedValid == false && (
                <div
                  className="error"
                  style={{
                    fontSize: "15px",
                    paddingBottom: "0px",
                    backgroundColor: "#ACD7AB",
                    color: "red",
                  }}
                >
                  {" "}
                  {"Please select activities"}{" "}
                </div>
              )}
            </Grid>
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
              <Button onClick={addBar} value={"Bars"} style={buttonTextStyle}>
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
          </Grid>
          <Grid item xs={3}>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "#919E6A",
                fontSize: "20px",
                paddingTop: "0px",
                paddingBottom: "0px",
                textAlign: "right",
              }}
            >
              Current List:
              <Tooltip title="Delete list">
                <IconButton onClick={deleteList}>
                  <DeleteIcon sx={{ color: "#919E6A" }} />
                </IconButton>
              </Tooltip>
            </Typography>
            {activityObjects}
          </Grid>
        </Grid>
        <Grid container spacing={0}>
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
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                paddingTop: "-10px",
                textAlign: "center",
              }}
            >
              Starting Address or City *
            </Typography>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "15px",
                paddingTop: "-10px",
                textAlign: "center",
              }}
            >
              Please type out full state name. Examples:
            </Typography>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "15px",
                paddingTop: "-10px",
                textAlign: "center",
              }}
            >
              20 W 34th St, New York, NY 10001
            </Typography>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "15px",
                paddingTop: "-10px",
                textAlign: "center",
              }}
            >
              New York City, New York
            </Typography>
            <TextField
              id="filled"
              variant="outlined"
              size="small"
              margin="none"
              onBlur={() => setAddressDirty(true)}
              error={addressDirty && isAddressValid === false}
              helperText={
                addressDirty && isAddressValid === false
                  ? "Please enter starting location"
                  : ""
              }
              FormHelperTextProps={{ classes: helperTestClasses }}
              onInput={handleAddress}
              value={address}
              style={textfieldStyle}
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                width: "50%",
              }}
              muifilledinput={{ borderBottomLeftRadius: "0px" }}
              InputProps={{
                disableUnderline: true,
                padding: "0px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              paddingTop: "0px",
              marginTop: "-20px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                textAlign: "center",
              }}
            >
              Max Mile Radius
            </Typography>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Distance from starting address (Default is 30 miles)
            </Typography>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "15px",
                textAlign: "center",
              }}
            >
              Please enter only digits
            </Typography>
            <TextField
              id="filled"
              variant="outlined"
              type="number"
              size="small"
              margin="none"
              onInput={handleClickRadius}
              style={textfieldStyle}
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                width: "15%",
              }}
              muifilledinput={{ borderBottomLeftRadius: "0px" }}
              InputProps={{
                disableUnderline: true,
                padding: "0px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "-20px",
              marginBottom: "0px",
              paddingTop: "0px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                paddingTop: "0px",
                marginBottom: "-40px",
                textAlign: "center",
              }}
            >
              Price Range
            </Typography>
            <StyledToggleButtonGroup
              size="small"
              exclusive
              value={formats}
              onChange={handleFormat}
              aria-label="price"
            >
              <ToggleButton
                value={1}
                onClick={handleClickPrice}
                style={{
                  fontSize: "15px",
                  outlineColor: "grey",
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  color: "black",
                }}
              >
                {"  "}$
              </ToggleButton>
              <ToggleButton
                value={2}
                onClick={handleClickPrice}
                style={{
                  fontSize: "15px",
                  outlineColor: "grey",
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  color: "black",
                }}
              >
                $${" "}
              </ToggleButton>
              <ToggleButton
                value={3}
                onClick={handleClickPrice}
                style={{
                  fontSize: "15px",
                  outlineColor: "grey",
                  outlineWidth: "1px",
                  outlineStyle: "solid",
                  color: "black",
                }}
              >
                $$$
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Grid>
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
          {errorMessage && (
            <div
              className="error"
              style={{
                fontSize: "15px",
                fontWeight: 600,
                paddingBottom: "0px",
                backgroundColor: "#ACD7AB",
                color: "red",
              }}
            >
              {" "}
              {errorMessage}{" "}
            </div>
          )}
          <Typography
            style={{
              fontFamily: "Manrope, sans-serif",
              color: "white",
              fontSize: "15px",
              paddingTop: "-10px",
              textAlign: "center",
            }}
          >
            * This indicates these fields are required
          </Typography>
        </Grid>
      </Card>
    </div>
  );
};

export default Recommendations;
