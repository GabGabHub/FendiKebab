const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventsRoutes = require('./routes/events');
const attendanceRoutes = require('./routes/attendance');


const app = express();
const PORT = 5000; 

app.use(bodyParser.json());
app.use(cors());

app.use('/api', eventsRoutes);
app.use('/api', attendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
