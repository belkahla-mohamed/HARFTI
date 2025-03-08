const express = require('express');
const fs = require('fs');
const servicesCollection = require('../models/Services');

const router = express.Router();

// Get Services
router.get('/services', async (req, res) => {
    try {
        const data = await fs.promises.readFile('./dataJson/services.json', 'utf8');
        const servicesData = JSON.parse(data);

        if (!Array.isArray(servicesData) || servicesData.length === 0) {
            return res.status(400).json({ status: 'error', message: 'Invalid or empty services data' });
        }

        $result = await servicesCollection.deleteMany();
        if ($result) {
            await servicesCollection.insertMany(servicesData);
            check = await servicesCollection.find().lean();
            return res.json({ status: 'success', services: check });
        }



    } catch (err) {
        console.error('Error in /services:', err);
        return res.status(500).json({ status: 'error', message: 'Error fetching services', error: err.message });
    }
});

module.exports = router;
