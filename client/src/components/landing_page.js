import React from "react";
import { useState, useContext, useEffect, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { styled } from '@mui/styles';

// const card = styled(Card)({
//     fontFamily: "Manrope, sans-serif",
//       fontSize: "70px",
//       left: "30%",
//       position: "absolute",
//       top: "50%",
//       transform: "translate(-50%, -50%)",
//       borderStyle: "none",
//       borderWidth: 0,
//       width: "30%",
//       height: "50%",
//       textAlign: "left",
//       padding: "60px",
//       backgroundColor: theme.palette.background.default,
//       boxShadow: "none",
// });

// const font = styled(Font)({
//     fontColor: theme.typography.fontColor,
//     fontFamily: theme.typography.fontFamily,
//   })

const LandingPage = () => {


    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((data) => setData(data.message));
      }, []);
      

    return (
        <div className="home">
            <div class="container">
            <div class="row align-items-center my-5">
                <div class="col-lg-7">
                <img
                    class="img-fluid rounded mb-4 mb-lg-0"
                    src="http://placehold.it/900x400"
                    alt=""
                />
                </div>
                <div class="col-lg-5">
                <h1 class="font-weight-light">Home</h1>
                <p>
                City Explorer helps you find personalized things to do in your city.
                </p>
                <p>{!data ? "Loading..." : data}</p>
                </div>
            </div>
            </div>
        </div>
        );
    }
        
        export default LandingPage;