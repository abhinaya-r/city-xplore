import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import loginImage from "../images/loginImage.png";
import Header from "../components/header";
import { Link } from "react-router-dom";
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

import axios from "axios";

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
  };

  const [itinerary, getItinerary] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [count, setCount] = React.useState(0);

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

  const getNewItinerary = () => {
    axios
      .get("/api/new_itinerary")
      .then((response) => {
        const allActivities = response.data;
        getItinerary(allActivities);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  React.useEffect(() => {
    getNewItinerary();
  }, []);

  const itineraryObjects = [];

  if (itinerary) {
    console.log(itinerary);
    for (const [index, value] of itinerary.entries()) {
      itineraryObjects.push(
        <Activity
          name={!itinerary ? "Loading..." : value["name"]}
          rating={!itinerary ? "" : value["rating"]}
          address={!itinerary ? "" : value["address"]}
        />
      );
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
            <Tooltip title="Change parameters">
              <IconButton>
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
          <Grid item xs={12}>
            {itineraryObjects}
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "0px",
              marginTop: "0px",
              textAlign: "center",
              padding: "10px",
            }}
          >
            <Button
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
