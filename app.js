
var express = require('express');
var cors = require('cors');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var multer = require("multer");
var path = require('path');

var app = module.exports = express();

// allow cross origin calls or requests
app.use(cors());

//set the port 
app.set('port',5000 );

//use morgan to log requests to console 
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'uploads')));
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//send app to router
require('./router')(app);

//creating server 
http.createServer(app).listen(app.get('port'), function () {
    console.log("The server listening port " + app.get('port'));
})





