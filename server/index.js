// server/index.js

const express = require("express");

const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

const path = require("path");

const axios = require('axios')
const key = 'AIzaSyALq3_ZhQojUobHPmhQl3Ij-eoQ-ZR9w18';

// const db = require('../database/models/index.js');

app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("api/new_itinerary", (req, res) => {
  console.log("request data: ", req.body);
})

let startpoint = '';
let activities  = [];

app.get("/api/new_itinerary", (req, res) => {
  console.log("get new itinerary");
  console.log(activities)
  console.log("startpoint:", startpoint);
  let itinerary = [];
  // let prev_latlong = '40.748817%2C-73.985428';
  // let prev_latlong = '40.741112%2C-73.989723'
  let prev_latlong = startpoint;
  // activities = ['bakery', 'museum', 'restaurant'];
  let place_id = '';
  for (let i = 0; i < activities.length; i+=1) {
    console.log(activities[i])
    let latlong = prev_latlong;
    const radius = '3218';
    const type = activities[i];

    var config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlong}&radius=${radius}&type=${type}&key=${key}`,
        headers: { }
      };
      axios(config)
      .then(function (response) {
        // console.log("name: ", response.data["results"][0]["name"]);
        // console.log("location: ", response.data["results"][0]["geometry"]["location"]);
        // console.log("place id: ", response.data["results"][0]["place_id"]);
        // console.log("rating: ", response.data["results"][0]["rating"]);

        let ind = Math.floor(Math.random() * (response.data["results"].length));
        console.log("index: ", ind);
        prev_latlong = response.data["results"][ind]["geometry"]["location"];
        let place_name = response.data["results"][ind]["name"];
        let rating = response.data["results"][ind]["rating"];

        place_id = response.data["results"][ind]["place_id"];

        config = {
          method: 'get',
          url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name%2Crating%2Cformatted_phone_number%2Cformatted_address&key=${key}`,
          headers: { }
        };
        console.log(i);
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          let address = response.data["result"]['formatted_address'];
          let curr_event = {"name": place_name, "rating": rating, "address": address}
          itinerary.push(curr_event);
          if (i == (activities.length-1)){
            res.send(itinerary);
          }
            
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log("activity: ", activities[i], " itinerary: ", itinerary)
        })
        .catch(function (error) {
          console.log(error);
        });
        console.log("itinerary: ", itinerary);
      }
})


app.post('/api/signup', function(req, res) {
  const user = req.body;
  console.log("post req:", user);

  // db.Users.findOrCreate({where: {email: user.email}})
  //   .then(([user, created]) => {
  //     res.json({ user:user, status: 'SUCCESS', created: created});
  //     res.end();
  //   });
});

app.post("/api/new_itinerary", function(req, res) {
  const itinerary = req.body;
  console.log("post req:", itinerary);
  let address = itinerary.address;
  activities = itinerary.activities;

  config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`,
    headers: { }
  };
  axios(config)
        .then(function (response) {
          console.log("response: ", response.data['results'][0]['geometry']);
          let location = response.data['results'][0]['geometry']['location'];
          startpoint = location['lat'] + "%2C" + location['lng'];
        })
        .catch(function (error) {
          console.log("error");
          console.log(error);
        });
  res.send({status: "SUCCESS"});
  res.end();


})   

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
