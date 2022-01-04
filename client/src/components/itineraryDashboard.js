import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@mui/material/Box";
import axios from "axios";
import Activity from "./activityDashboard";

export default function Itinerary(props) {
  const [data, setData] = React.useState(null);
  const cardStyle = {
    backgroundColor: "#ACD7AB",
    // paddingBottom: "10px",
    // marginBottom: "50px",
    width: "25%",
    height: "60%",
  };

  return (
    <div>
      <Card style={cardStyle}>
        <Grid container direction="row" spacing={0}>
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
                justifyContent: "center",
              }}
            >
              {" "}
              date
              {props.date}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* {itineraryObjects} */}
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
