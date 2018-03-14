var express = require('express');

var app = express();

function enteringMexicoBorder(req, res, next) {
  if (req.params.name === "ok") {
    next();
  } else {
    res.redirect("http://www.google.com");
  }
}

// app.use(function(req, res, next) {
//   if (0 < 1) {
//     next();  // goes to the next route
//   } else {
//     res.json("You can't cross the border")
//   }
// });

app.get('/mexico/:name', enteringMexicoBorder, function (req, res, next) {
  res.json("We are in mexico");
  console.log(res);
});

app.get('/test', function(req, res, next) {
    console.log('This is just a console debug message');
  res.json("Test page");
});

app.get('/:name', function(req, res, next) {
  res.json(req.params.name);
});

app.listen(9000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Running on port 9000");
  }
});
