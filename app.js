var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dygraphs',  express.static(__dirname + '/node_modules/dygraphs'));

var routes = require('./routes/index');
app.use('/', routes);
app.use('/upload', routes);

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

//Define global upload folder
var uploads = path.join(__dirname, 'uploads'); 
app.set('uploads', uploads);

// Entry point
var ImageMeasurementsFileParser = require(path.join(__dirname, 'libs', 'ImageMeasurementsFileParser.js'));
var parser = new ImageMeasurementsFileParser();
parser.process(path.join(__dirname, './main/resources/filename-mappings.csv'));

parser.on('end', function(map) {
    console.log('Data mapping image files with the associated camera measurements has been successfully parsed:');
    app.set('mappings', map);
    console.log(map);
});

module.exports = app;
