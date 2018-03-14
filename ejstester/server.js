var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-mate');

var app = express();

mongoose.connect('mongodb://root:abc123@ds155218.mlab.com:55218/mongoosetest', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to DB")
    }
});

var userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

var User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

app.get('/users', function(req, res, next) {
    User.findOne({name: "Postman" }, function(err, foundUser) {
        if (foundUser) {
            res.render('about', {name: foundUser});
        } else {
            res.json('User ' + req.params.name + ' not found!');
        }
    });
});

app.engine('ejs', engine);
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
    res.render('home');
});

app.get('/about-us', function(req, res, next) {
    res.render('about', {name: "Just Awesome hey!"});
});

app.listen(8080);
