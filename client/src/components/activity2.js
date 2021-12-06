import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Box from "@mui/material/Box";
import axios from "axios"

export default function Activity2(props) {
  return (
    <div>
      <Box
        component="span"
        sx={{
            display: "block",
            bgcolor: "#FFF6F1",
            borderRadius: "10px",
            marginBottom:"30px"
        }}
        style= {{width: "100%"}}
        >
      
            <Box sx= {{alignItems: 'left'}} style={{
            width: "100%",
            color: "#919E6A",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "5px",
            marginTop: "-20px",
            marginBottom: "10px",
            }}>
            {props.name}
          </Box>
           
            <Box sx= {{alignItems: 'left'}} style={{
            width: "100%",
            color: "#919E6A",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "5px",
            marginTop: "-20px",
            marginBottom: "10px",
            }}>
           {props.rating} stars
          </Box>
            <Box sx= {{alignItems: 'left'}} style={{
            width: "100%",
            color: "#919E6A",
            fontSize: "10px",
            fontWeight: "bold",
            padding: "5px",
            marginTop: "-20px",
            marginBottom: "10px",
            }}>
            {props.address}
          </Box>
        </Box>
    </div>
  );
}
