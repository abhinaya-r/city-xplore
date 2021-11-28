import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "../components/header";
import Itinerary from "../components/itinerary";

const Mainpage = () => {
  const typeStyle = {
    font: "Manrope, sans-serif",
    color: "#919E6A",
    textAlign: "left",
    paddingLeft: "80px",
    paddingTop: "20px",
    fontSize: "30px",
  };
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Grid container justifyContent="center" spacing={0}>
        <Grid
          item
          xs={12}
          style={{
            textAlign: "center",
            paddingTop: "10px",
          }}
          columns={3}
        >
          <Typography variant="h5" style={typeStyle}>
            Past Itineraries:
          </Typography>
        </Grid>
        <Grid item xs={10} style={{ paddingTop: "30px" }}>
          <Itinerary></Itinerary>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center", paddingTop: "30px" }}>
          <Button
            as="input"
            type="submit"
            value="Submit"
            style={{
              color: "white",
              backgroundColor: "orange",
              fontFamily: "Manrope, sans-serif",
              padding: "30px",
              justifyContent: "center",
              fontSize: "15px",
            }}
          >
            Create a new Itinerary!
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Mainpage;
