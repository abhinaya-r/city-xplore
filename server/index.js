// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const axios = require("axios");
const key = process.env.API_KEY;
const nodemailer = require("nodemailer");
var usersRouter = require("./users");
var itinRouter = require("./itineraries");
var activityRouter = require("./activities");


let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}



// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/users", usersRouter);
app.use("/itineraries", itinRouter);
app.use("/activities", activityRouter);

// Have Node serve the files for built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));


// Create new itinerary using Google Places API
// https://developers.google.com/maps/documentation/geocoding/start
// https://developers.google.com/maps/documentation/places/web-service/search-nearby
// https://developers.google.com/maps/documentation/places/web-service/details
app.get("/api/new_itinerary", (req, res) => {
  let params = req.query;
  let address = params.address;
  let activities = params.activities;
  let radius = params.radius;
  let price = params.price;
  let blacklist = params.blacklist;
  let itinerary = [];
  let prev_latlong = "";
  let place_id = "";
  let url = "";

  config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      let location = response.data["results"][0]["geometry"]["location"];
      prev_latlong = location["lat"] + "%2C" + location["lng"];
      for (let i = 0; i < activities.length; i += 1) {
        let latlong = prev_latlong;
        const type = activities[i];

        var config = {
          method: "get",
          url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlong}&radius=${radius}&maxprice=${price}&type=${type}&key=${key}`,
          headers: {},
        };
        axios(config)
          .then(function (response) {
            if (response.data["results"].length == 0) {
              res.send({ message: "Radius is too small" });
            }
            let place_name = "";
            let rating = 5;
            if (blacklist != null) {
              while (true) {
                let ind = Math.floor(
                  Math.random() * response.data["results"].length
                );
                prev_latlong =
                  response.data["results"][ind]["geometry"]["location"];
                place_name = response.data["results"][ind]["name"];
                rating = response.data["results"][ind]["rating"];
                place_id = response.data["results"][ind]["place_id"];
                for (activity of blacklist) {
                  activity = JSON.parse(activity);
                  if (activity.activity.name == place_name) {
                    continue;
                  }
                }
                break;
              }
            } else {
              let ind = Math.floor(
                Math.random() * response.data["results"].length
              );
              prev_latlong =
                response.data["results"][ind]["geometry"]["location"];
              place_name = response.data["results"][ind]["name"];
              rating = response.data["results"][ind]["rating"];
              place_id = response.data["results"][ind]["place_id"];
            }

            config = {
              method: "get",
              url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Crating%2Cformatted_phone_number%2Cformatted_address%2Curl&key=${key}`,
              headers: {},
            };
            axios(config)
              .then(function (response) {
                let address = response.data["result"]["formatted_address"];
                url = response.data["result"]["url"];
                let curr_event = {
                  name: place_name,
                  rating: rating,
                  address: address,
                  type: type,
                  url: url,
                };
                itinerary.push(curr_event);
                if (itinerary.length == activities.length) {
                  res.send({
                    message: "success",
                    itinerary: itinerary,
                    list: activities,
                  });
                }
              })
              .catch(function (error) {
                console.error(error);
              });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
});

// Send email using nodemailer to reset password
// https://www.w3schools.com/nodejs/nodejs_email.asp
app.get("/api/forgotpassword", function (req, res) {
  const request = req.query;
  let url = `${uriBase}/resetpassword?token=${request.token}`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "cityxplorecontact@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  var mailOptions = {
    from: "cityxplorecontact@gmail.com",
    to: request.email,
    subject: "Reset Password for City-Xplore",
    text: "Click here to reset your password: " + url,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent. ");
    }
  });
});


// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
