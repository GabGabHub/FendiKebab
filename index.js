const express = require('express');
const bodyParser = require('body-parser');
const eventsRoutes = require('./backend/routes/events');
const attendanceRoutes = require('./backend/routes/attendance');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/api', eventsRoutes);
app.use('/api', attendanceRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
