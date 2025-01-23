// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp endpoint
app.get("/api/timestamp/:date_string", function (req, res) {
  var dateString = req.params.date_string;
  var date;

  // If the dateString is a valid Unix timestamp
  if (/^\d{5,}$/.test(dateString)) {
    // Convert Unix timestamp to a date object
    date = new Date(parseInt(dateString));
  } else {
    // Convert a human-readable date string to a date object
    date = new Date(dateString);
  }

  // If the date is valid
  if (date instanceof Date && !isNaN(date)) {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  } else {
    // If the date is invalid
    res.json({
      error: "Invalid Date"
    });
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
