
const router = require('express').Router()
const axios = require('axios')
module.exports = router
const key = 'AIzaSyALq3_ZhQojUobHPmhQl3Ij-eoQ-ZR9w18';

const latlong = '-33.8670522%2C151.1957362';
const radius = '1500';
const type = 'restaurant';

var config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latlong}&radius=${radius}&type=${type}&key=${key}`,
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });