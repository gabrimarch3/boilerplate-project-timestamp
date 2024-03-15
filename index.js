// index.js
// Node.js Express application for the Timestamp Microservice

const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes so that API is testable by freeCodeCamp
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Send the main file for the root route
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// A simple API endpoint that returns a greeting
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Timestamp Microservice API endpoint
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  // If no date string is provided, use the current date
  if (!dateString) {
    date = new Date();
  } else {
    // Check if dateString is a Unix timestamp (contains only digits)
    if (!isNaN(dateString) && /^\d+$/.test(dateString)) {
      // Convert Unix timestamp to milliseconds and create a new date object
      date = new Date(parseInt(dateString));
    } else {
      // Try to create a date object using the provided string
      date = new Date(dateString);
    }
  }

  // Validate the date object
  if (date.toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  } else {
    // Return the JSON response with both the Unix timestamp and UTC string
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});

// Listen for requests on the port specified by the environment or default to 3000
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
