// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const app = express();
const path = require("path");
const axios = require("axios");
const key = process.env.API_KEY;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
var usersRouter = require("./users");
var itinRouter = require("./itineraries");
var activityRouter = require("./activities");

axios.default.baseURL = "http://localhost:3001/";
if (process.env.NODE_ENV == "production") {
  axios.default.baseURL = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  axios.default.baseURL = "https://test-xplore.herokuapp.com";
}

let uriBase = "http://localhost:3000";
if (process.env.NODE_ENV == "production") {
  uriBase = "https://city-xplore.herokuapp.com";
} else if (process.env.NODE_ENV == "prod-test") {
  uriBase = "https://test-xplore.herokuapp.com";
}

// const db = require('../database/models/index.js');

app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use("/users", usersRouter);
app.use("/itineraries", itinRouter);
app.use("/activities", activityRouter);
// Have Node serve the files for built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.post("/api/new_itinerary", function (req, res) {
  const itinerary = req.body;
  console.log("create itinerary:", itinerary);
  let address = itinerary.address;
  activities = itinerary.activities;
  radius = itinerary.radius;
  price = itinerary.price;
  blacklist = itinerary.blacklist;

  config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`,
    headers: {},
  };
  axios(config)
    .then(function (response) {
      // console.log("response: ", response.data["results"][0]["geometry"]);
      let location = response.data["results"][0]["geometry"]["location"];
      startpoint = location["lat"] + "%2C" + location["lng"];
    })
    .catch(function (error) {
      console.log("error");
      console.log(error);
    });
  res.send({ status: "SUCCESS" });
  res.end();
});

function getLatLong(address) {
  config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`,
    headers: {},
  };
  return axios(config)
    .then(function (response) {
      // console.log("response: ", response.data["results"][0]["geometry"]);
      let location = response.data["results"][0]["geometry"]["location"];
      startpoint = location["lat"] + "%2C" + location["lng"];
    })
    .catch(function (error) {
      console.log("error");
      console.log(error);
    });
}

app.get("/api/new_itinerary", (req, res) => {
  let params = req.query;
  console.log(params);
  let address = params.address;
  let activities = params.activities;
  let radius = params.radius;
  let price = params.price;
  let blacklist = params.blacklist;
  let importance = params.importance;
  // console.log(activities);
  // console.log("address:", address);

  let config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`,

  };
  return axios(config)
    .then(function (response) {
      // console.log("response: ", response.data["results"][0]["geometry"]);
      let location = response.data["results"][0]["geometry"]["location"];
      let startpoint = location["lat"] + "%2C" + location["lng"];
      let itinerary = [];
      let prev_latlong = startpoint;
      let place_id = "";
      let url = "";
      for (let i = 0; i < activities.length; i += 1) {
        let latlong = prev_latlong;
        const type = activities[i];
        console.log("type: ", type)

        if (importance == 'popularity') {
          config = {
            method: "get",
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${prev_latlong}&radius=${radius}&maxprice=${price}&type=${type}&key=${key}`,
          };
        }
        else {
          console.log("distance")
          config = {
            method: "get",
            url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${prev_latlong}&maxprice=${price}&type=${type}&rankby=distance&key=${key}`,
          };
        }
        axios(config)
          .then(function (response) {
            if (response.data["results"].length == 0) {
              console.log("radius too small");
              res.send({ message: "Radius is too small" });
            }
            let place_name = "";
            let rating = 5;
            if (blacklist != null) {
              while (true) {
                console.log("creating itinerary");
                let ind = Math.floor(
                  Math.random() * response.data["results"].length
                );
                console.log("ind: ", ind, " length:" , response.data["results"].length)
                console.log("result: ", response.data["results"][ind])
                prev_latlong =
                response.data["results"][ind]["geometry"]["location"];
                place_name = response.data["results"][ind]["name"];
                rating = response.data["results"][ind]["rating"];
                place_id = response.data["results"][ind]["place_id"];
                for (let activity of blacklist) {
                  activity = JSON.parse(activity)
                  console.log(activity)
                  if (activity.activity.name == place_name) {
                    console.log("activity is in blacklist");
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

            };
            // console.log("ind: ", i);
            axios(config)
              .then(function (response) {
                // console.log(JSON.stringify(response.data));
                let address = response.data["result"]["formatted_address"];
                url = response.data["result"]["url"];
                let curr_event = {
                  name: place_name,
                  rating: rating,
                  address: address,
                  type: type,
                  url: url,
                };
                console.log("curr event: ", curr_event)
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
                console.log(error);
              });
            // console.log("activity: ", activities[i], " itinerary: ", itinerary);
          })
          .catch(function (error) {
            console.log(error);
          });
        // console.log("itinerary: ", itinerary);
      }
    })
    .catch(function (error) {
      console.log("error");
      console.log(error);
    });
});

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
      console.log("Email sent: " + info.response);
    }
  });
});
app.post("/api/login", function (req, res) {
  // res.send({
  //   token: "test123",
  // });
  console.log("request: ", req.body);
  let logged_in = false;
  const user = req.body;
  console.log("post req:", user);
  axios
    .get("/users", { params: user })
    .then((res) => {
      result = res.data.result[0];
      // console.log("response: ", res.data.result[0]);
      p_prime = crypto.createHash("md5").update(user.password).digest("hex");
      if (p_prime == result.password) {
        logged_in = true;
        console.log("correct password");
      }
    })
    .catch((err) => err.message);
  console.log("token: ", result.token);
  res.send({
    token: result.token,
  });
});

app.post("/api/signup", function (req, res) {
  console.log("request: ", req.body);
  const user = req.body;
  console.log("post req:", user);
  axios
    .post("/users", user)
    .then((res) => {
      res_token = res.token;
    })
    .catch((err) => err.message);
  console.log(res_token);
  res.send({
    token: res_token,
  });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

/* GET React App */
// router.get(['/client', '/client/*'], function(req, res, next) {
//   res.sendFile(path.join(__dirname, '../public', 'app.html'));
//  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
