const express = require('express');
const fs = require('fs');
const  servicesCollection  = require('../models/Services');

const router = express.Router();

// Get Services
router.get('/services', async (req, res) => {
    try {
        const data = await fs.promises.readFile('./dataJson/services.json', 'utf8');
        const servicesData = JSON.parse(data);

        let check = await servicesCollection.find().lean();

        if (check.length === 0) {
            await servicesCollection.insertMany(servicesData);
            check = await servicesCollection.find().lean();
            return res.json({ status: 'success', services: check });
        } else {
            return res.json({ status: 'success', services: check });
        }

    } catch (err) {
        console.error('Error in /services:', err);
        return res.status(500).json({ status: 'error', message: 'Error fetching services', error: err.message });
    }
});

module.exports = router;
