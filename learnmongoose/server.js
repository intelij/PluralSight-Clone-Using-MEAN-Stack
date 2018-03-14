var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

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


userSchema.methods.addLastname = function(lastname) {
    this.name = this.name + " " + lastname;
    return this.name;
}

var User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));



app.get('/user/:id', function(req, res, next) {
    User.findById({ _id: req.params.id }, function(err, foundUser) {
        foundUser.addLastname("Sivako");
        foundUser.save(function(err) {
            res.json(foundUser);
        })
    });
});

app.get('/:name', function(req, res, next) {
    User.findOne({ name: req.params.name }, function(err, foundUser) {
        if (foundUser) {
            res.json(foundUser);
        } else {
            res.json('User ' + req.params.name + ' not found!');
        }
    });
});


app.post('/create-user', function(req, res, next) {
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age;
    user.save(function(err) {
        if (err) {
            console.log('We have an error, trying to save the data');
        } else {
            res.json(user);
        }
    });
});

//app.get('/create-user', function(req, res, next) {
//  var user = new User();
//  user.name = "Karen Mkhonza";
//  user.age = 27;
//  user.save(function(err) {
//      if (err) {
//        next(err);
//      }
//      res.json(user);
//  });
//});


// app.get('/:name', function(req, res, next) {
//   res.json(req.params.name);
// });

app.listen(3000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Running on port 3000");
  }
});
