import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
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
let activitiesDisplay = [];

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

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
  const [address, setAddress] = React.useState("");
  const [act, setAct] = useState(0);
  const [nextPage, setNextPage] = useState("/getitinerary");
  const [formats, setFormats] = React.useState(() => []);
  const [alignment, setAlignment] = React.useState("left");
  // let [activities, setActivities] = React.useState([]);
  // let [activitiesDisplay, setActivitiesDisplay] = React.useState([]);
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
    // setActivities(activities.push("restaurant"));
    activities.push("restaurant");
    activitiesDisplay.push("Restaurant");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log(activities);
  };
  const addBar = () => {
    activities.push("bar");
    activitiesDisplay.push("Bar");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log(activities);
  };
  const addMuseum = () => {
    activities.push("museum");
    activitiesDisplay.push("Museum");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log(activities);
  };
  const addBakery = () => {
    activities.push("bakery");
    activitiesDisplay.push("Bakery");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log(activities);
  };
  const addTheater = () => {
    activities.push("movie_theater");
    activitiesDisplay.push("Movie Theater");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log(activities);
  };
  const addCafe = () => {
    activities.push("cafe");
    activitiesDisplay.push("Cafe");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log(activities);
  };
  const addPark = () => {
    activities.push("park");
    activitiesDisplay.push("Park");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log("display: ", activitiesDisplay);
  };
  const addBookstore = () => {
    activities.push("book_store");
    activitiesDisplay.push("Book Store");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log(activities);
  };
  const addAttraction = () => {
    activities.push("tourist_attraction");
    activitiesDisplay.push("Tourist Attraction");
    setAct(act + 1);
    setSelectedIsValid(true);
    console.log("display: ", activitiesDisplay);
  };

  const deleteList = () => {
    activities = [];
    activitiesDisplay = [];
    setAct(act + 1);
    setSelectedIsValid(false);
    console.log("activities in delete list: ", activities);
  };
  let radius = 30 * 1609;
  const handleClickRadius = (event) => {
    const { myValue } = event.currentTarget.dataset;
    console.log(myValue); // --> 123
    radius = myValue * 1609;
  };
  let price = 2;
  const handleClickPrice = (event) => {
    const { myValue } = event.currentTarget.dataset;
    console.log(myValue); // --> 123
    price = myValue;
  };

  const isDashboard = "false";

  // const getBlacklist = () = {
  //   let token = localStorage.getItem("token");
  //   let tk = JSON.parse(token);
  //   axios.get(`${uriBase}/activities/blacklist?token=${token}`)
  //   .then((res) => {
  //     console.log(res);
  //     let blacklist = res.data.blacklist;
  //     setBlacklist(blacklist);
  //   }).catch((error) => console.error(`Error: ${error}`))
  // };

  // const blacklist = () = {
  //   let token = localStorage.getItem("token");
  //   let tk = JSON.parse(token);
  // };
  const createItinerary = () => {
    if (isAddressValid && isSelectedValid) {
      let token = localStorage.getItem("token");
      let tk = JSON.parse(token);
      axios
        .get(`${uriBase}/activities/blacklist?token=${tk.token}`)
        .then((res) => {
          console.log("blacklist: ", res.data);
          let blacklist = res.data;
          axios
            .post("api/new_itinerary", {
              activities: activities,
              address: address,
              radius: radius,
              price: price,
              blacklist: blacklist,
            })
            .then((response) => {
              sessionStorage.setItem("activities", activities);
              sessionStorage.setItem("address", address);
              sessionStorage.setItem("radius", radius);
              sessionStorage.setItem("price", price);
              sessionStorage.setItem("blacklist", blacklist);
              sessionStorage.setItem("importance", importance);
              console.log(response.data);
              if (response.data["status"] == "SUCCESS") {
                console.log("success");
                window.location.href = "/itinerary";
              }
            });
        });
    } else {
      console.log("isAddressValid: ", isAddressValid);
      console.log("isSelectedValid: ", isSelectedValid);
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
        {/* <form onSubmit={createItinerary}> */}
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
              Starting Address, City, or Zip Code *
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
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                fontSize: "15px",
                paddingTop: "-10px",
                textAlign: "center",
              }}
            >
              10001
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
        {/* </form> */}
      </Card>
    </div>
  );
};

export default Recommendations;
