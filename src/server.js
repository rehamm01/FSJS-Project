// src/server.js
const mongoose = require('mongoose');	// Load mongoose package
const path = require('path');  // Sets up our express application to serve static files.
const bodyParser = require('body-parser');  // Looks at the body of a request, will parse the body using JSON.parse(). The results will be put in req.body for use by any middleware.
const express = require('express');
const config = require('./config');
const router = require('./routes');
var hbs = require('hbs');


// Connect to MongoDB and create/use database as configured
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);


// Import all models
require('./models/file.model.js');


// Creates an application object
const app = express();


// Creates Details Page Template
app.set('view engine', 'html')
app.engine('html', hbs.__express);
app.set('views', 'public')


// Handles Static Files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));


//Tells server how to use Body Parser
app.use(bodyParser.json());


// Directs our App to the router
app.use('/api', router);


// Sets each Entry up as it's own page
app.get('/entry/:id', function (req, res) {
	const File = mongoose.model('File');
	const id = req.params.id;

	File.findById(id)
		.then(function(file) {
	  		res.render('pages/details', file);
		})
		.catch(err => {
			console.log("All broken!", err.message);
			res.send(err.message);
		})
})


//Start the Server
app.listen(config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}`);
});

