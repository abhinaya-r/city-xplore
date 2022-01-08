import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import Box from "@mui/material/Box";
import Activity from "../components/activity";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  return today;
};

const UserItinerary = () => {
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
    overflow: "auto",
  };

  const [itinerary, getItinerary] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activityOrder, setActivityOrder] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRefresh = () => {
    setOpen(false);
    window.location.reload(false);
  };

  const handleBack = () => {
    window.location.href = "/getitinerary";
  };

  const handleSave = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log(token);
    axios
      .post(`${uriBase}/itineraries`, {
        date: getDate(),
        itinerary: itinerary,
        token: tk.token,
      })
      .then((window.location.href = "/dashboard"))
      .catch((error) => console.error(`Error: ${error}`));
  };

  let activities = sessionStorage.getItem("activities");
  let address = sessionStorage.getItem("address");
  let radius = sessionStorage.getItem("radius");
  let price = sessionStorage.getItem("price");
  let blacklist = sessionStorage.getItem("blacklist");
  let importance = sessionStorage.getItem("importance");
  console.log("activities test", activities);
  console.log("address", address);
  console.log("radius", radius);
  console.log("price", price);
  console.log("blacklist", blacklist);
  console.log("importance", importance);

  const getNewItinerary = () => {
    setIsLoading(true);
    axios
      .get("/api/new_itinerary")
      .then((response) => {
        console.log("response getNewItinerary: ", response);
        const allActivities = response.data.itinerary;
        getItinerary(allActivities);
        setActivityOrder(response.data.list);
        console.log("posting itinerary");
        console.log("message: ", response.data.message);
        console.log("itinerary: ", response.data.itinerary);
        setIsLoading(false);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  React.useEffect(() => {
    getNewItinerary();
  }, []);

  const itineraryObjects = [];

  if (itinerary) {
    let itineraryTemp = [...itinerary.entries()];
    for (const [ind, actOrder] of activityOrder.entries()) {
      let i = 0;
      for (const [index, value] of itineraryTemp) {
        // console.log("itinerary Temp: ", itineraryTemp);
        // console.log("value itinerary: ", value);
        if (value["type"] === actOrder) {
          itineraryObjects.push(
            <Activity
              name={!itinerary ? "Loading..." : value["name"]}
              rating={!itinerary ? "" : value["rating"]}
              address={!itinerary ? "" : value["address"]}
              type={value["type"]}
              url={value["url"]}
              activity={value}
            />
          );
          itineraryTemp.splice(i, 1);
        }
        i++;
      }
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Card style={cardStyle}>
        <Grid container direction="row" spacing={0}>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginBottom: "-40px",
              marginTop: "-80px",
              textAlign: "left",
            }}
          >
            <Tooltip title="Create new form">
              <IconButton onClick={handleBack}>
                <ArrowBackIcon
                  sx={{
                    color: "#919E6A",
                    fontSize: "30px",
                  }}
                ></ArrowBackIcon>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              border: "0px",
              marginBottom: "-40px",
              marginTop: "-80px",
              textAlign: "right",
            }}
          >
            <Tooltip title="Refresh Itinerary">
              <IconButton>
                <RefreshIcon
                  onClick={handleClickOpen}
                  sx={{
                    color: "#919E6A",
                    fontSize: "30px",
                  }}
                ></RefreshIcon>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ border: "0px", marginTop: "0px", marginBottom: "0px" }}
          >
            <Typography
              style={{
                color: "white",
                fontSize: "40px",
                fontWeight: "bold",
                marginBottom: "30px",
                marginTop: "-20px",
                justifyContent: "center",
              }}
            >
              {" "}
              {getDate()}
            </Typography>
          </Grid>
          {isLoading ? (
            <Grid item xs={12}>
              <CircularProgress />{" "}
            </Grid>
          ) : (
            <Grid item xs={12}>
              {itineraryObjects.length != 0 ? (
                <Grid item xs={12}>
                  {itineraryObjects}
                </Grid>
              ) : (
                <Typography
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginBottom: "30px",
                    justifyContent: "center",
                  }}
                >
                  "Oops, sorry! No activities were found. Please try refreshing
                  or going back and sending the form again with a different
                  address.{" "}
                </Typography>
              )}
            </Grid>
          )}
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              textAlign: "center",
              padding: "10px",
              marginTop: "-20px",
              marginBottom: "-40px",
            }}
          >
            <Button
              onClick={handleSave}
              style={{
                color: "white",
                backgroundColor: "#919E6A",
                fontFamily: "Manrope, sans-serif",
                textAlign: "center",
              }}
            >
              Save Itinerary
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: "#ACD7AB",
              boxShadow: "none",
              color: "white",
            },
          }}
        >
          <DialogTitle id="alert-dialog-title" style={{ color: "white" }}>
            {"Confirm Refresh"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "white" }}
            >
              Are you sure you want to refresh the itinerary? These activities
              will be lost, so be sure to favorite the ones you like!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "white" }}>
              Cancel
            </Button>
            <Button onClick={handleRefresh} style={{ color: "white" }}>
              Refresh
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
};

export default UserItinerary;
