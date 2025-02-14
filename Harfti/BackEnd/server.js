const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const usersCollection = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const { ObjectId } = require('mongodb'); 

const app = express();

app.use(express.json());
app.use(cors());



const JWT_SECRET = 'votre_clé_secrète_ici'; // Replace with a secure key

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Route to create a user
app.post('/create', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password , image} = req.body;
        console.log('Request Body:', req.body); // Debugging log

        if (!firstName || !lastName || !username || !email || !password) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        const check = await usersCollection.findOne({ username });
        if (check) {
            return res.json({ status: 'error', message: 'Username already exists!' });
        }
        const passwordhach =await bcrypt.hash(password , 10)

        const user = new usersCollection({ firstName, lastName, username, email, password : passwordhach , image});
        const result = await user.save();

        if (result) {
            const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ status: 'success', message: 'User added successfully', token });
        }
    } catch (err) {
        console.error('Error in /create:', err); // Debugging log
        res.status(500).json({ message: 'Error adding user', error: err.message });
    }
});

// Route to login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Login Request Body:', req.body); // Debugging log

        if (!username || !password) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        const user = await usersCollection.findOne({ username });
        if (!user) {
            return res.json({ status: 'error', message: 'User does not exist!' });
        }

        const check  = await bcrypt.compare(password  , user.password)

        if (check) {
            const token = jwt.sign({ userId: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            return res.json({ status: 'success', message: 'Login successful', token, user });
        } else {
            return res.json({ status: 'error', message: 'Incorrect password' });
        }
    } catch (err) {
        console.error('Error in /login:', err); // Debugging log
        res.status(500).json({ message: 'Error during login', error: err.message });
    }
});



app.put('/update', async (req, res) => {
    try {
        const { id, newfirstName, newlastName, newemail, newusername, newpassword, items } = req.body;

        // Vérifier que tous les champs requis sont fournis
        if (!id || !newfirstName || !newlastName || !newemail || !newusername || !newpassword) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        // Vérifier si l'ID est valide
        if (!ObjectId.isValid(id)) {
            return res.json({ status: 'error', message: 'Invalid user ID' });
        }

        // Hasher le mot de passe de manière sécurisée
        const hashedPassword = await bcrypt.hash(newpassword, 10);

        // Mise à jour de l'utilisateur
        const update = await usersCollection.updateOne(
            { _id: new ObjectId(id) },  // Recherche par `_id`
            { 
                $set: { 
                    username: newusername, 
                    firstName: newfirstName,
                    lastName: newlastName, 
                    email: newemail, 
                    password: hashedPassword, 
                    image: items
                } 
            }
        );

        // Vérifier si un document a été modifié
        if (update.modifiedCount === 0) {
            return res.json({ status: 'error', message: 'No user updated. User not found or same data provided.' });
        }

        return res.json({ status: 'success', message: 'Update successful' });

    } catch (err) {
        console.error('Error in update:', err);
        return res.status(500).json({ message: 'Error during update', error: err.message });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où enregistrer les fichiers
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Renommer le fichier
    }
});

const upload = multer({ storage: storage });

app.put('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const userId = req.body.id; // Récupérer l'ID envoyé depuis le frontend
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

app.use('/uploads', express.static('uploads')); // Servir les fichiers statiquement

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});