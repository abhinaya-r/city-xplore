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
import ToggleButton from "@mui/material/ToggleButton";
import { ToggleButtonGroup } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

let activities = [];
let activitesDisplay = [];

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    borderRadius: 5,
    backgroundColor: "white",
    borderColor: "black",
    "&.Mui-disabled": {
      border: 0,
      color: "white",
    },
    //   "&:first-of-type": {
    //     borderRadius: theme.shape.borderRadius,
    //   },
  },
}));

// const useStyles = makeStyles((theme) => ({
//   selected: {
//     "&&": {
//       backgroundColor: "black",
//       color: "black",
//     },
//     color: "black",
//   },
// }));

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
      // fontWeight: 400,
      color: "red",
    },
  },
}));

const Recommendations = () => {
  const [address, setAddress] = useState("");
  const [act, setAct] = useState(0);
  const [nextPage, setNextPage] = useState("/getitinerary");
  const [formats, setFormats] = React.useState(() => []);
  const [alignment, setAlignment] = React.useState("left");
  // const classes = useStyles();

  const helperTestClasses = helperTextStyles();
  const [isAddressValid, setAddressIsValid] = useState(false);
  const [addressDirty, setAddressDirty] = useState(false);
  const [isSelectedValid, setSelectedIsValid] = useState(false);
  const [selectedDirty, setSelectedDirty] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleAddress = (event) => {
    const val = event.target.value;
    console.log("val: ", val);
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

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const addRestaurant = () => {
    activities.push("restaurant");
    activitesDisplay.push("Restaurant");
    setAct(act + 1);
    console.log(activities);
  };
  const addBar = () => {
    activities.push("bar");
    activitesDisplay.push("Bar");
    setAct(act + 1);
    console.log(activities);
  };
  const addMuseum = () => {
    activities.push("museum");
    activitesDisplay.push("Museum");
    setAct(act + 1);
    console.log(activities);
  };
  const addBakery = () => {
    activities.push("bakery");
    activitesDisplay.push("Bakery");
    setAct(act + 1);
    console.log(activities);
  };
  const addTheater = () => {
    activities.push("movie_theater");
    activitesDisplay.push("Movie Theater");
    setAct(act + 1);
    console.log(activities);
  };
  const addCafe = () => {
    activities.push("cafe");
    activitesDisplay.push("Cafe");
    setAct(act + 1);
    console.log(activities);
  };
  const addPark = () => {
    activities.push("park");
    activitesDisplay.push("Park");
    setAct(act + 1);
    console.log("display: ", activitesDisplay);
  };
  const addBookstore = () => {
    activities.push("book_store");
    activitesDisplay.push("Book Store");
    setAct(act + 1);
    console.log(activities);
  };
  const addAttraction = () => {
    activities.push("tourist_attraction");
    activitesDisplay.push("Tourist Attraction");
    setAct(act + 1);
    console.log("display: ", activitesDisplay);
  };

  const deleteList = () => {
    activities = [];
    activitesDisplay = [];
    setAct(act + 1);
    console.log("activities in delete list: ", activities);
  };

  const isDashboard = "false";

  const createItinerary = () => {
    console.log("create itinerary");
    console.log("activities: ", activities.length);
    if (activities.length == 0) setSelectedIsValid(false);
    else setSelectedIsValid(true);

    if (isAddressValid && isSelectedValid) {
      axios
        .post("api/new_itinerary", {
          activities: activities,
          address: address,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data["status"] == "SUCCESS") {
            console.log("success");
            window.location.href = "/itinerary";
            // setNextPage("/itinerary");
            // location.href = "/itinerary";
          }
        });
    } else {
      if (isAddressValid === false) setAddressDirty(true);
      if (isSelectedValid === false) setSelectedDirty(true);
      setErrorMessage("Please fix form errors");
    }
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
    overflow: "auto",
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
    // border: "#FFFFFF",
  };

  const activityObjects = [];

  for (const [index, value] of activitesDisplay.entries()) {
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
  console.log("objects: ", activityObjects);

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
              Choose one or more of the categories in order *
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
              style={textfieldStyle}
              style={{ backgroundColor: "white", borderRadius: 5 }}
              muifilledinput={{ borderBottomLeftRadius: "0px" }}
              InputProps={{
                disableUnderline: true,
                padding: "0px",
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginTop: "-20px",
              paddingTop: "0px",
            }}
          >
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "25px",
                paddingTop: "0px",
                paddingBottom: "10px",
                textAlign: "center",
              }}
            >
              Max Mile Radius{" "}
            </Typography>
            <TextField
              select
              variant="outlined"
              size="small"
              margin="none"
              style={{ backgroundColor: "white", borderRadius: 5 }}
              InputProps={{
                disableUnderline: true,
                padding: "0px",
              }}
            >
              <MenuItem value={10}>5</MenuItem>
              <MenuItem value={20}>10</MenuItem>
              <MenuItem value={30}>20</MenuItem>
              <MenuItem value={30}>50</MenuItem>
            </TextField>
          </Grid>

          <Grid
            item
            xs={6}
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
              value={formats}
              onChange={handleFormat}
              aria-label="price"
            >
              {/* <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              style={{ marginTop: "-10px" }}
            > */}
              <ToggleButton
                value="p1"
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
                value="p2"
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
                value="p3"
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
              {/* </ToggleButtonGroup> */}
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
