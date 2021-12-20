import React from "react";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import Grid from "@material-ui/core/Grid";

export default function Activity(props) {
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
    marginTop: "-20px",
    marginBottom: "10px",
  };

  return (
    <div>
      <Box
        component="span"
        sx={{
          display: "block",
          bgcolor: "#FFF6F1",
          borderRadius: "10px",
          marginBottom: "30px",
        }}
      >
        <Grid container spacing={0} columns={2}>
          <Grid item xs={11} style={gridStyle}>
            <Box sx={{ alignItems: "left" }} style={boxStyle}>
              {props.name}
            </Box>
            <Box sx={{ alignItems: "left" }} style={boxStyle}>
              {props.rating} stars
            </Box>
            <Box sx={{ alignItems: "left" }} style={boxStyle}>
              {props.address}
            </Box>
          </Grid>
          {/* <Grid item xs={1} style={gridStyle}>
            <RefreshIcon sx={{ color: "#919E6A" }}></RefreshIcon>
          </Grid> */}
        </Grid>
      </Box>
    </div>
  );
}
