const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  {usersCollection}  = require('../models/User');
const multer = require('multer');
const path = require('path')


const router = express.Router();
const JWT_SECRET = 'votre_clé_secrète_ici';

// User Registration

const storage = multer.diskStorage({
    destination:( req , file, cb  )=>{
        cb(null , 'EmployeePhotos/' )
    },
    filename:(req,file,cb)=>{
        cb(null , Date.now()+path.extname(file.originalname))
    }
})

const upload =  multer({storage})
router.post('/create', upload.single('photo') , async (req, res) => {
    try {
        const { fullname, username, email, password , role , service , age , phone ,photo  } = req.body;
      console.log(photo)
        const PhotoName = req.file ? req.file.filename : photo;
        if (!fullname  || !username || !email || !password) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        const check = await usersCollection.findOne({ username });
        if (check) {
            return res.json({ status: 'error', message: 'Username already exists!' });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = new usersCollection({ fullname, username, email, password: passwordHash , photo:PhotoName ,  role , service , age , phone  });
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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ status: 'error', message: 'All fields are required!' });
        }

        let user = await usersCollection.findOne({ email });
        if(!user){

            user =  await usersCollection.findOne({ username:email });
        }
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
