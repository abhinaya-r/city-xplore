import React from "react";
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

import axios from "axios";

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

export default function Activity(props) {
  const [isFavorited, setIsFavorited] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState("#FFF6F1");
  // const [activity, setActivity] = React.useState(null);

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
  };

  // const addActivity = (props) => {
  //   setActivity(props.data);
  //   console.log("activity: ", activity);
  // };

  // React.useEffect(() => {
  //   addActivity(props);
  // }, []);

  const handleFavorited = () => {
    setIsFavorited(!isFavorited);
    let token = localStorage.getItem("token");
    let tk = JSON.parse(token);
    console.log(token);
    axios
      .post(`${uriBase}/activities/favorite`, {
        token: tk.token,
        activity: props.activity,
      })
      .then((response) => {
        console.log("response:", response);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const handleBlacklist = () => {
    setColor("#808080");
    setOpen(false);
  };
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
          <Grid item xs={9} style={gridStyle}>
            <Box sx={{ alignItems: "left" }} style={boxStyle}>
              {props.name}
            </Box>
            {props.rating !== null ? (
              <Box sx={{ alignItems: "left" }} style={boxStyle}>
                {props.rating} stars
              </Box>
            ) : (
              <Box sx={{ alignItems: "left" }} style={boxStyle}>
                "Unknown rating"
              </Box>
            )}
            <Box sx={{ alignItems: "left" }} style={boxStyle}>
              {props.address}
            </Box>
          </Grid>
          {isFavorited == false ? (
            <Tooltip title="Add to favorites">
              <IconButton onClick={handleFavorited}>
                <FavoriteBorderIcon
                  sx={{ color: "#919E6A" }}
                ></FavoriteBorderIcon>
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Remove from favorites">
              <IconButton onClick={handleFavorited}>
                <FavoriteIcon sx={{ color: "#919E6A" }}></FavoriteIcon>
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Don't show again">
            <IconButton onClick={handleClickOpen}>
              <BlacklistIcon sx={{ color: "#919E6A" }}></BlacklistIcon>
            </IconButton>
          </Tooltip>
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
