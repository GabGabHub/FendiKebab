const express = require('express');
const router = express.Router();
const models = require('./models.js');

router.post('/attendance', async (req, res) => {
    const { name, email, accessCode } = req.body;

    try {
        const event = await models.Event.findOne({ where: { accessCode } });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
            let participant = await models.Participant.findOne({ where: { email } });
            if (!participant) {
                participant = await models.Participant.create({ 
                    name, 
                    email, 
                    accessCode 
                });
            }
        const attendance = await models.Attendance.create({
            eventId: event.id,
            participantId: participant.id,
            timestamp: new Date().toLocaleString(),
        });

        res.status(201).json({ message: 'Attendance recorded successfully', attendance });
    } catch (err) {
        console.error('Error recording attendance:', err);
        res.status(500).json({ error: 'Error recording attendance' });
    }
});
/*router.post('/attendance', (req, res) => {
    const record = req.body;
    models.recordAttendance(record, (err) => {
        if (err) return res.status(500).send("Error recording attendance.");
        res.status(201).send("Attendance recorded.");
    });*/ 

router.get('/attendance/:eventId', (req, res) => {
    const { eventId } = req.params;

    models.getAttendanceByEvent(eventId, (err, rows) => {
        if (err) return res.status(500).send('Error fetching attendance.');
        res.json(rows);
    });
});

module.exports = router;
