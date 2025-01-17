const express = require('express');
const router = express.Router();
const { generateQRCode } = require('./qrCode.js'); 
const models = require('./models.js')

router.post('/events', async (req, res) => {
    const event = req.body;
    try {
        const qrCode = await generateQRCode(event.accessCode);
        models.createEvent(event, (err, result) => {
            if (err) return res.status(500).send("Error creating event.");
            res.status(201).json({ ...result, qrCode });
            console.log('Event was created');
        });
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).send("Error generating QR code.");
    }
});

router.get('/events', (req, res) => {
    models.getAllEvents((err, rows) => {
        if (err) return res.status(500).send("Error fetching events.");
        res.json(rows);
    });
});

module.exports = router;
