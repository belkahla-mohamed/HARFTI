const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  {usersCollection}  = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'votre_clé_secrète_ici';

// User Registration
router.post('/create', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password, image } = req.body;
        if (!firstName || !lastName || !username || !email || !password) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        const check = await usersCollection.findOne({ username });
        if (check) {
            return res.json({ status: 'error', message: 'Username already exists!' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new usersCollection({ firstName, lastName, username, email, password: passwordHash, image });
        const result = await user.save();

        if (result) {
            const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ status: 'success', message: 'User added successfully', token });
        }
    } catch (err) {
        console.error('Error in /create:', err);
        res.status(500).json({ message: 'Error adding user', error: err.message });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.json({ status: 'error', message: 'User does not exist!' });
        }

        const check = await bcrypt.compare(password, user.password);
        if (check) {
            const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ status: 'success', message: 'Login successful', token, user });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (err) {
        console.error('Error in /login:', err);
        res.status(500).json({ message: 'Error during login', error: err.message });
    }
});

module.exports = router;
