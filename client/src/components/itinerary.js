import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@mui/material/Box";

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
                <Typography
                  noWrap={true}
                  variant="h6"
                  style={{ color: "white" }}
                >
                  Date
                </Typography>
              }
            />

            <CardContent style={{ paddingBottom: "0px" }}>
              <Box
                component="span"
                sx={{
                  display: "block",
                  bgcolor: "#FFF6F1",
                  borderRadius: "10px",
                }}
                style={{
                  width: "100%",
                  color: "#919E6A",
                  fontSize: "10px",
                  fontWeight: "bold",
                  padding: "5px",
                  marginTop: "-20px",
                  marginBottom: "10px",
                }}
              >
                Activity 1
              </Box>
              <Box
                component="span"
                sx={{
                  display: "block",
                  bgcolor: "#FFF6F1",
                  borderRadius: "10px",
                }}
                style={{
                  width: "100%",
                  color: "#919E6A",
                  fontSize: "10px",
                  fontWeight: "bold",
                  padding: "5px",
                  marginBottom: "10px",
                }}
              >
                Activity 2
              </Box>
              <Box
                component="span"
                sx={{
                  display: "block",
                  bgcolor: "#FFF6F1",
                  borderRadius: "10px",
                }}
                style={{
                  width: "100%",
                  color: "#919E6A",
                  fontSize: "10px",
                  fontWeight: "bold",
                  padding: "5px",
                  marginBottom: "-15px",
                }}
              >
                Activity 3
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
