import React from "react";
import Box from "@mui/material/Box";
import RefreshIcon from "@mui/icons-material/Refresh";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";

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
    marginTop: "-10px",
    marginBottom: "0px",
  };

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
          <Grid item xs={10} style={gridStyle}>
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
          {props.isRefresh === "false" ? (
            <></>
          ) : (
            <Tooltip title="Refresh">
              <IconButton style={{ paddingTop: "-20px" }}>
                <RefreshIcon sx={{ color: "#919E6A" }}></RefreshIcon>
              </IconButton>
            </Tooltip>
          )}
        </Grid>
      </Box>
    </div>
  );
}
