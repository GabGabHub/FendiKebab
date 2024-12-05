const express = require('express');
const router = express.Router();
const { generateQRCode } = require('../utils/qrCode'); // Import the QR code generator
const events = require('../routes/events'); // Your events model
const models = require('../models.js')

// Create an event
router.post('/events', async (req, res) => {
    const event = req.body;
    try {
        // Generate a QR code for the event access code
        const qrCode = await generateQRCode(event.accessCode);
        // Save event to the database
        models.createEvent(event, (err, result) => {
            if (err) return res.status(500).send("Error creating event.");
            // Add the QR code to the response
            res.status(201).json({ ...result, qrCode });
        });
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).send("Error generating QR code.");
    }
});

// Get all events
router.get('/events', (req, res) => {
    models.getAllEvents((err, rows) => {
        if (err) return res.status(500).send("Error fetching events.");
        res.json(rows);
    });
});

module.exports = router;
