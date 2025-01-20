const express = require('express');
const router = express.Router();
const models = require('./models.js')

router.post('/auth/signin', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Name and password are required.');
    }

    try {
        const eoData = { name, password };
        models.signIn(eoData, (err, user) => {
            if (err) {
                console.error('Error during sign-in:', err);
                return res.status(500).send('Error signing in.');
            }

            res.status(201).json({
                message: 'Sign-in successful',
                user: {
                    id: user.id,
                    name: user.name,
                },
            });
        });
    } catch (error) {
        console.error('Error in /auth/signin route:', error);
        res.status(500).send('Internal server error.');
    }
});

router.post('/auth/login', async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).send('Username and password are required.');
    }

    try {
        const logDetails = { name, password };
        models.logIn(logDetails, (err, user) => {
            if (err) {
                console.error('Error during login:', err);
                return res.status(401).send(err);
            }

            res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                },
            });
        });
    } catch (error) {
        console.error('Error in /auth/login route:', error);
        res.status(500).send('Internal server error.');
    }
});
module.exports = router;
