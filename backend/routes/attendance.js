const express = require('express');
const router = express.Router();
const attendance = require('../routes/attendance');
const models = require('../models.js')

router.post('/attendance', (req, res) => {
    const record = req.body;
    models.recordAttendance(record, (err) => {
        if (err) return res.status(500).send("Error recording attendance.");
        res.status(201).send("Attendance recorded.");
    });
});

router.get('/attendance/:eventId', (req, res) => {
    const { eventId } = req.params;
    models.getAttendanceByEvent(eventId, (err, rows) => {
        if (err) return res.status(500).send("Error fetching attendance.");
        res.json(rows);
    });
});

module.exports = router;
 