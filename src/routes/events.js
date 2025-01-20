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

router.delete('/events/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    try {
        models.deleteEvent(id, (err, result) => {
            if (err) return res.status(500).send("Error delenting event.");
            console.log('Event was deleted');
        })
    }catch(error){
        console.error("Error deleting event", error);
        res.status(500).send("Error generating QR code.");
    }
});

router.get('/events', (req, res) => {
    models.getAllEvents((err, rows) => {
        if (err) return res.status(500).send("Error fetching events.");
        res.json(rows);
    });
});

router.get('/events/:id', async (req,res) => {
    const { id } = req.params;
    console.log(id);
    models.getUserEvents(id, (err, result) => {
        if (err) return res.status(500).send("Error fetching events.");
    res.json(rows);
    });
});

module.exports = router;
