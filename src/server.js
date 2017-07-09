// src/server.js
const path = require('path');  // Sets up our express application to serve static files.
const bodyParser = require('body-parser');  // Looks at the body of a request, will parse the body using JSON.parse(). The results will be put in req.body for use by any middleware.

const express = require('express');
const config = require('./config');
const router = require('./routes');

// Creates an application object
const app = express();

// Handles Static Files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//Tells server how to use Body Parser
app.use(bodyParser.json());

// Directs our App to the router
app.use('/api', router);

//Start the Server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});