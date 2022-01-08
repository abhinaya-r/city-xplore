import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "../components/header";
import Itinerary from "../components/itineraryDashboard";
import Activity from "../components/activityDashboard";
import { Link } from "react-router-dom";
import axios from "axios";
import { letterSpacing } from "@mui/system";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import DeleteIcon from "@mui/icons-material/Delete";
import { Tooltip } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    margin: "10px",
  },
  gridList: {
    flexWrap: "nowrap",
    // position: "absolute",
  },
  gridListTile: {
    position: "relative",
    display: "block", // In case it's not rendered with a div.
  },
}));

const Mainpage = () => {
  const [pastItineraries, setPastItineraries] = React.useState(null);
  const [favActivities, setFavActivities] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [openActivity, setOpenActivity] = React.useState(false);
  const [count, setCount] = React.useState(0);

  // const [activity, setActivity] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenActivity = () => {
    setOpenActivity(true);
  };
  const handleCloseActivity = () => {
    setOpenActivity(false);
  };
  const classes = useStyles();

  const cardStyle = {
    backgroundColor: "#ACD7AB",
    padding: "20px",
    // marginBottom: "20px",
    // width: "25%",
    // height: "25%",
    fontFamily: "Manrope, sans-serif",
    borderRadius: "10px",
  };

  const getPastItineraries = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    let url = `${uriBase}/itineraries?token=${tk.token}`;
    axios
      .get(url)
      .then((response) => {
        setPastItineraries(response.data);
      })
      .catch((error) => console.error(`Error past itineraries: ${error}`));
  };

  // let favActivityObjects = [];
  let favorited = [];

  const getFavoritedActivities = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    let url = `${uriBase}/activities/favorite?token=${tk.token}`;
    axios
      .get(url)
      .then((response) => {
        if (response != null) {
          for (const [index, value] of response.data.entries()) {
            favorited.push(value["activity"]);
          }
        }
        setFavActivities(favorited);
      })
      .catch(() => setFavActivities(favorited));
  };

  const typeStyle = {
    font: "Manrope, sans-serif",
    fontFamily: "Manrope, sans-serif",
    color: "#919E6A",
    textAlign: "left",
    paddingLeft: "80px",
    paddingTop: "20px",
    fontSize: "30px",
  };

  const handleItineraries = () => {
    let itins = [];
    itins = getPastItineraries();
  };

  const handleDelete = (itinerary) => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log("in delete itinerary", itinerary);
    // console.log("token", token);
    axios
      .post(`${uriBase}/itineraries/remove`, {
        token: tk.token,
        itinerary: itinerary,
      })
      .then((response) => {
        console.log("response:", response);
        getPastItineraries();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handleDeleteActivity = (activity) => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log("in delete activity", activity);

    axios
      .post(`${uriBase}/activities/favorite/remove`, {
        token: tk.token,
        activity: activity,
      })
      .then((response) => {
        console.log("response:", response);
        getFavoritedActivities();
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  React.useEffect(() => {
    getPastItineraries();
    getFavoritedActivities();
  }, []);

  let activityObjects = [];
  let pastItineraryObjects = [];

  if (pastItineraries) {
    for (const [indexItin, valueItin] of pastItineraries.reverse().entries()) {
      let date = valueItin["date"].split("T");
      activityObjects.push(
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "white",
                textAlign: "center",
                paddingBottom: "10px",
                fontSize: "20px",
              }}
            >
              {date[0]}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Delete itinerary">
              <IconButton onClick={() => handleDelete(valueItin)}>
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      );
      for (const [indexAct, valueAct] of valueItin["itinerary"].entries()) {
        activityObjects.push(
          <Activity
            name={valueAct["name"]}
            rating={valueAct["rating"]}
            address={valueAct["address"]}
          />
        );
      }
      pastItineraryObjects.push(
        <GridListTile
          classes={classes.gridListTile}
          style={{
            margin: "10px",
            padding: "5px",
            height: "100%",
            backgroundColor: "#ACD7AB",
            borderRadius: "10px",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          {activityObjects}
        </GridListTile>
      );
      activityObjects = [];
    }
  }

  let favActivityObjects = [];
  console.log("favActivities: ", favActivities);

  if (favActivities.length != 0) {
    console.log("favActivityObjects length: ", favActivityObjects.length);
    console.log("favActivities: ", favActivities);
    for (const [index, value] of favActivities.entries()) {
      favActivityObjects.push(
        <GridListTile
          classes={classes.gridListTile}
          style={{
            paddingTop: "10px",
            paddingLeft: "5px",
            paddingRight: "5px",
            margin: "10px",
            height: "100%",
            backgroundColor: "#ACD7AB",
            borderRadius: "10px",
            fontFamily: "Manrope, sans-serif",
          }}
        >
          <Activity
            name={value["name"]}
            rating={value["rating"]}
            address={value["address"]}
          />
          <Tooltip title="Delete activity">
            <IconButton onClick={() => handleDeleteActivity(value)}>
              <DeleteIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </GridListTile>
      );
    }
  }

  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Grid container justifyContent="center" spacing={3}>
        <Typography
          variant="h5"
          style={{
            fontFamily: "Manrope, sans-serif",
            color: "#919E6A",
            textAlign: "left",
            paddingTop: "20px",
            fontSize: "32px",
          }}
        >
          Your CityXplore Dashboard!
        </Typography>
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: "30px" }}>
          <Link
            to="/getitinerary"
            style={{
              color: "white",
              fontFamily: "Manrope, sans-serif",
              textDecoration: "none",
            }}
          >
            <Button
              as="input"
              type="submit"
              value="Submit"
              style={{
                color: "white",
                backgroundColor: "#E6AA52",
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
              Create a new Itinerary!
            </Button>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            paddingTop: "10px",
          }}
        >
          <Typography variant="h5" style={typeStyle}>
            Saved Itineraries:
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            paddingTop: "0px",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          {pastItineraryObjects.length != 0 ? (
            <GridList cols={3} className={classes.gridList}>
              {pastItineraryObjects}
            </GridList>
          ) : (
            <Typography
              style={{
                fontFamily: "Manrope, sans-serif",
                color: "#919E6A",
                textAlign: "center",
                paddingTop: "20px",
                paddingBottom: "10px",
                fontSize: "20px",
              }}
            >
              No saved itineraries yet. Create a new itinerary to get started!
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
          }}
        >
          <Typography variant="h5" style={typeStyle}>
            Favorited Activities:
          </Typography>
          <Grid
            item
            xs={12}
            style={{
              paddingTop: "0px",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          >
            {favActivityObjects.length != 0 ? (
              <GridList cols={5} className={classes.gridList}>
                {favActivityObjects}
              </GridList>
            ) : (
              <Typography
                style={{
                  fontFamily: "Manrope, sans-serif",
                  color: "#919E6A",
                  textAlign: "center",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                  fontSize: "20px",
                }}
              >
                "No favorited activities yet!"
              </Typography>
            )}
          </Grid>
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
          {"Confirm Delete Itinerary"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "white" }}
          >
            Are you sure you want to delete the itinerary?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} style={{ color: "white" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openActivity}
        onClose={handleCloseActivity}
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
          {"Confirm Delete Activity"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "white" }}
          >
            Are you sure you want to delete the activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActivity} style={{ color: "white" }}>
            Cancel
          </Button>
          <Button onClick={handleDeleteActivity} style={{ color: "white" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Mainpage;
