// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;
/* Spin up the server*/
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };


//#################################################################
// POST route
app.post('/addWeatherdata', addData);
function addData(req, res) {
  projectData={
      temp:req.body.temp,
      date:req.body.date,
      content:req.body.newFeeling
  };
  res.send(projectData);
}

// Respond with JS object when a GET request is made to the homepage
app.get('/all', getData);
function getData(req, res) {
  res.send(projectData);
}
