import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

export default function Itinerary() {
  const cardStyle = {
    backgroundColor: "#ACD7AB",
    paddingBottom: "60px",
    marginBottom: "50px",
  };


  return (
    <div>
      <Grid container>
        <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
          <Card style={cardStyle} raised>
            <CardHeader
              title={
                <Typography noWrap={true} variant="h6">
                  Date
                </Typography>
              }
            />

            <CardContent style={{ paddingBottom: "0px" }}>
              <Typography variant="body2" color="textSecondary">
                Itinerary
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
