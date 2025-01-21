const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const eventsRoutes = require('./routes/events');
const attendanceRoutes = require('./routes/attendance');
const eventOrganizer = require('./routes/admin');

/*app.use(cors({
  origin: 'http://playful-licorice-99ec34.netlify.app/api', // Replace with your Netlify domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
*/

const app = express();
const PORT = 5000; 

app.use(bodyParser.json());
app.use(cors());

app.use('/api', eventsRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', eventOrganizer);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
