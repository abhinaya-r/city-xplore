import React from "react";
import Box from "@mui/material/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

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

// Activity component on Dashboard
export default function Activity(props) {
  //Styling
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

  // Render activity
  return (
    <div>
      <Box
        component="span"
        display="flex"
        sx={{
          display: "block",
          bgcolor: "#FFF6F1",
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
      </Box>
    </div>
  );
}
