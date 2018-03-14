var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var MongoStore = require('connect-mongo')(session);
var passport = require('passport');


var app = express();

mongoose.connect('mongodb://root:abc123@ds155218.mlab.com:55218/mongoosetest', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to the DB")
    }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "Hello",
    store: new MongoStore({url: 'mongodb://root:abc123@ds155218.mlab.com:55218/mongoosetest', autoReconnect: true})
}));

app.listen(8080, function(err) {
  if (err) {
      console.log(err);
  } else {
      console.log("Connected to the DB")
  }
});
