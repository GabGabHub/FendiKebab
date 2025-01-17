const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; 

app.use(bodyParser.json());
app.use(cors());

let events = [];

app.get('/api/events', (req, res) => {
  res.json(events); 
});

app.post('/api/events', (req, res) => {
  const { name, startTime, endTime } = req.body;
  const newEvent = { id: events.length + 1, name, startTime, endTime };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});