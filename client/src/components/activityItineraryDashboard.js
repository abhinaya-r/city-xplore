import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
import BlacklistIcon from "@mui/icons-material/DoDisturb";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import axios from "axios";

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

const map = new Map();
map.set("restaurant", "Restaurant");
map.set("bar", "Bar");
map.set("museum", "Museum");
map.set("bakery", "Bakery");
map.set("movie_theater", "Movie Theater");
map.set("cafe", "Cafe");
map.set("park", "Park");
map.set("book_store", "Book Store");
map.set("tourist_attraction", "Tourist Attraction");

const useStyles = makeStyles((theme) => ({
  a: {
    hover: { backgroundColor: "black" },
  },
}));

export default function Activity(props) {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  // const [color, setColor] = React.useState("#FFF6F1");
  const [isBlacklisted, setIsBlacklisted] = React.useState(false);
  // const [activity, setActivity] = React.useState(null);
  const classes = useStyles();

  const favActivities = props.favActivities;
  const setFavActivities = props.setFavActivities;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const gridStyle = {
    border: "0px",
    marginTop: "0px",
    marginBottom: "0px",
  };

  const boxStyle = {
    width: "100%",
    color: "#919E6A",
    fontSize: "10px",
    fontWeight: "bold",
    padding: "5px",
    marginTop: "-10px",
    marginBottom: "0px",
    fontFamily: "Manrope, sans-serif",
  };

  let favorited = [...favActivities];
  const handleFavorited = () => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log(token);
    console.log("is it favorited: ", isFavorited);
    console.log("props: ", props);
    setIsFavorited(!isFavorited);
    if (!isFavorited) {
      axios
        .post(`${uriBase}/activities/favorite`, {
          token: tk.token,
          activity: props.activity,
        })
        .then((response) => {
          // console.log("response favorite:", response);
          console.log("favActivities before: ", favorited);
          console.log("setfavActivities Activity : ", setFavActivities);
          favorited.push(props.activity);
          console.log("favActivities after: ", favorited);
          props.setFavActivities(favorited);
          // checkIfFavorited(props.activity);
        })
        .catch((error) => console.error(`Error: ${error}`));
    } else {
      axios
        .post(`${uriBase}/activities/favorite/remove`, {
          token: tk.token,
          activity: props.activity,
        })
        .then((response) => {
          console.log("favorited:", favorited);
          let favoritedFiltered = favorited.filter(
            (act) => act.url !== props.activity.url
          );
          console.log("favoritedFiltered:", favoritedFiltered);
          checkIfFavorited(props.activity);
          props.setFavActivities(favoritedFiltered);
        })
        .catch((error) => console.error(`Error: ${error}`));
    }
  };

  const handleBlacklist = () => {
    setOpen(false);
    // setColor("gray");
    setIsBlacklisted(true);
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log(token);
    axios
      .post(`${uriBase}/activities/blacklist`, {
        token: tk.token,
        activity: props.activity,
      })
      .then((response) => {
        console.log("response blacklist:", response);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const checkIfFavorited = (activity) => {
    setIsFavorited(false);
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    let url = `${uriBase}/activities/favorite?token=${tk.token}`;
    axios
      .get(url)
      .then((response) => {
        if (response != null) {
          for (const [index, value] of response.data.entries()) {
            // console.log("valueCheck: ", value);
            // console.log("activity: ", activity);
            // console.log("equal: ", value["activity"] === activity);
            let val = value["activity"];
            if (
              val["address"] === activity["address"] &&
              val["name"] === activity["name"] &&
              val["url"] === activity["url"]
            ) {
              setIsFavorited(true);
              console.log("favorited: ", isFavorited);
            }
          }
          getFavoritedActivities(response.data);
        }
      })
      .catch(() => console.log("error in getting favorites"));
  };

  const checkIfBlacklisted = (activity) => {
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    let url = `${uriBase}/activities/blacklist?token=${tk.token}`;
    axios
      .get(url)
      .then((response) => {
        if (response != null) {
          for (const [index, value] of response.data.entries()) {
            // console.log("valueCheck: ", value);
            // console.log("activity: ", activity);
            // console.log("equal: ", value["activity"] === activity);
            let val = value["activity"];
            if (
              val["address"] === activity["address"] &&
              val["name"] === activity["name"] &&
              val["url"] === activity["url"]
            ) {
              // setColor("gray");
              setIsBlacklisted(true);
              console.log("blacklisted: ");
            }
          }
        }
      })
      .catch(() => console.log("error in getting favorites"));
  };

  // const checkFavorite = (activity, favorited) => {
  //   for (const [index, value] of favorited.entries()) {
  //     // console.log("activity: ", activity);
  //     // console.log("favorited: ", value);
  //     // console.log(
  //     //   "equal: ",
  //     //   value["address"] === activity["address"] &&
  //     //     value["name"] === activity["name"] &&
  //     //     value["url"] === activity["url"]
  //     // );
  //     if (
  //       value["address"] === activity["address"] &&
  //       value["name"] === activity["name"] &&
  //       value["url"] === activity["url"]
  //     ) {
  //       setIsFavorited(true);
  //       console.log("isFavorited");
  //     }
  //   }
  // };

  const getFavoritedActivities = (favorited) => {
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
        // props.setFavActivities(favorited);
      })
      .catch((err) => console.log("error favorites: ", err));
  };

  React.useEffect(() => {
    checkIfFavorited(props.activity);
    checkIfBlacklisted(props.activity);
  }, []);

  let color = "#FFF6F1";
  if (isBlacklisted) color = "gray";

  return (
    <div>
      <Box
        component="span"
        display="flex"
        sx={{
          display: "block",
          bgcolor: color,
          borderRadius: "10px",
          marginBottom: "20px",
          paddingTop: "0px",
          paddingBottom: "8px",
        }}
      >
        <Grid
          container
          direction="row"
          spacing={0}
          style={{ paddingTop: "10px" }}
        >
          <Grid item xs={8} style={gridStyle}>
            <Box sx={{ alignItems: "left" }} style={boxStyle}>
              {props.name}
            </Box>
            {props.rating !== undefined ? (
              <Box sx={{ alignItems: "left" }} style={boxStyle}>
                {props.rating} stars
              </Box>
            ) : (
              <Box sx={{ alignItems: "left" }} style={boxStyle}>
                Unknown rating
              </Box>
            )}
            <Box sx={{ alignItems: "left" }} style={boxStyle}>
              {props.address}
            </Box>
          </Grid>
          <Grid item xs={4} style={gridStyle}>
            {isFavorited == false ? (
              <Tooltip title="Add to favorites">
                <IconButton
                  onClick={handleFavorited}
                  style={{ minHeight: 0, minWidth: 0 }}
                >
                  <FavoriteBorderIcon
                    sx={{ color: "#919E6A" }}
                  ></FavoriteBorderIcon>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Remove from favorites">
                <IconButton
                  onClick={handleFavorited}
                  style={{ minHeight: 0, minWidth: 0 }}
                >
                  <FavoriteIcon sx={{ color: "#919E6A" }}></FavoriteIcon>
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Don't show again">
              <IconButton
                onClick={handleClickOpen}
                style={{ minHeight: 0, minWidth: 0 }}
              >
                <BlacklistIcon sx={{ color: "#919E6A" }}></BlacklistIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Open Activity in Google Maps">
              <IconButton style={{ minHeight: 0, minWidth: 0 }}>
                <a
                  href={props.url}
                  target="_blank"
                  style={{
                    textDecoration: "none",
                    padding: "0px",
                    margin: "0px",
                  }}
                >
                  <OpenInNewIcon sx={{ color: "#919E6A" }}></OpenInNewIcon>
                </a>
              </IconButton>
            </Tooltip>
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
            {"Confirm Activity Rejection"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{ color: "white" }}
            >
              Are you sure you don't want to see this activity again? Please
              refresh to get a new itinerary.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} style={{ color: "white" }}>
              Cancel
            </Button>
            <Button onClick={handleBlacklist} style={{ color: "white" }}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}
