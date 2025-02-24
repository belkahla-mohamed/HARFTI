const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const serviceRoutes = require('./routes/serviceRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Harfti')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route Middleware
app.use('/auth', authRoutes);

app.use('/', serviceRoutes);
app.use('/services', employeeRoutes);
app.use('/user',userRoutes);

// Serve Static Uploads
app.use('/uploads', express.static('uploads'));

// Start Server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
