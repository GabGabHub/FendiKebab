const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;  // Make sure this matches the port you're calling in your frontend

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());  // Enable CORS for your frontend to access the API

// In-memory "database" to store events
let events = [];

// Route to get all events
app.get('/api/events', (req, res) => {
  res.json(events);  // Respond with the events array
});

// Route to create a new event
app.post('/api/events', (req, res) => {
  const { name, startTime, endTime } = req.body;
  const newEvent = { id: events.length + 1, name, startTime, endTime };
  events.push(newEvent);  // Save the new event
  res.status(201).json(newEvent);  // Send back the newly created event
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});