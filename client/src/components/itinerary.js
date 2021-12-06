import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@mui/material/Box";
import axios from "axios"
import Activity from "./activity";

export default function Itinerary() {
  const [data, setData] = React.useState(null);
  const cardStyle = {
    backgroundColor: "#ACD7AB",
    paddingBottom: "10px",
    marginBottom: "50px",
  };

  return (
    <div>
      <Grid container>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
          <Card style={cardStyle} raised>
            <CardHeader
              title={
                <Typography
                  noWrap={true}
                  variant="h6"
                  style={{ color: "white" }}
                >
                  11/13/2021
                </Typography>
              }
            />
            <CardContent style={{ paddingBottom: "0px" }}>
              <Activity name= "Thompson Central Park New York" rating="4.3 stars" address="119 W 56th St, New York, NY 10019"/>
              <Activity name= "The Museum of Modern Art" rating="4.6 stars" address="11 W 53rd St, New York, NY 10019"/>
              <Activity name= "Magnolia Bakery - Rockefeller Center" rating="4.4 stars" address="1240 6th Ave, New York, NY 10020"/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
