const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb');
const { usersCollection } = require('../models/User');

const router = express.Router();

// Update User Info
router.put('/update', async (req, res) => {
    try {
        const { id, newfirstName, newlastName, newemail, newusername, newpassword, items } = req.body;

        if (!id || !newfirstName || !newlastName || !newemail || !newusername || !newpassword) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        if (!ObjectId.isValid(id)) {
            return res.json({ status: 'error', message: 'Invalid user ID' });
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);

        const update = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { username: newusername, firstName: newfirstName, lastName: newlastName, email: newemail, password: hashedPassword, image: items } }
        );

        if (update.modifiedCount === 0) {
            return res.json({ status: 'error', message: 'No user updated. User not found or same data provided.' });
        }

        return res.json({ status: 'success', message: 'Update successful' });

    } catch (err) {
        console.error('Error in update:', err);
        return res.status(500).json({ message: 'Error during update', error: err.message });
    }
});

// Multer Storage for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Upload User Image
router.put('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.body.id;
    if (!ObjectId.isValid(userId)) {
        return res.json({ status: 'error', message: 'Invalid user ID' });
    }

    try {
        const update = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: { image: req.file.filename } }
        );

        if (update.matchedCount === 0) {
            return res.json({ status: 'error', message: 'User not found' });
        } else {
            return res.json({ status: 'success', message: 'Image updated', filePath: `/uploads/${req.file.filename}` });
        }
    } catch (err) {
        console.error('Error in update:', err);
        return res.status(500).json({ message: 'Error during update', error: err.message });
    }
});

module.exports = router;
