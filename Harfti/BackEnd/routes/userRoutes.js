const express = require("express");
const router = express.Router();
const { usersCollection } = require("../models/User");
const { ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

// Get user profile by user ID
router.post("/Profile", async (req, res) => {
  const { userID } = req.body;

  try {
    if (userID) {
      const user = await usersCollection.findOne({ _id: new ObjectId(userID) });

      if (user) {
        return res.send({ status: "success", message: "User found", user });
      } else {
        return res.send({ status: "error", message: "User not found" });
      }
    } else {
      return res.send({ status: "error", message: "User ID not provided" });
    }
  } catch (error) {
    console.error(error);
    return res.send({ status: "error", message: "Server error", error });
  }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "EmployeePhotos/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Update user profile (including photo and password)
router.put("/Profile/Update", upload.single('photo'), async (req, res) => {
  try {
    const { userID, oldPass, newPass, ...formData } = req.body;
    const file = req.file;
    const userId = new ObjectId(userID);

    const user = await usersCollection.findOne({ _id: userId });

    if (!user) {
      return res.send({ status: "error", message: "User not found" });
    }

    // Delete old photo if it's not a default photo
    const oldPhoto = user.photo;
    if (oldPhoto && !oldPhoto.startsWith('avatar') && oldPhoto !== 'default.png') {
      const filePath = path.join(__dirname, "EmployeePhotos", oldPhoto);
      try {
        await fs.unlink(filePath);
      } catch (err) {
        console.error("Error deleting old photo:", err);
      }
    }

    // If new photo is uploaded, update the photo field
    if (file) {
      formData.photo = file.filename;
    }

    // Check and verify old password
    if (!oldPass) {
      return res.send({ status: "error", message: "Old password must be provided to update your information" });
    }

    const passwordMatch = await bcrypt.compare(oldPass, user.password);
    if (!passwordMatch) {
      return res.send({ status: "error", message: "Incorrect old password" });
    }

    // Handle new password if provided
    if (newPass) {
      const hashedPassword = await bcrypt.hash(newPass, 10);
      formData.password = hashedPassword;
    } else {
      delete formData.password; // Don't overwrite the password if new one is not provided
    }

    // Remove oldPass and newPass from the data to avoid saving them in the DB
    delete formData.oldPass;
    delete formData.newPass;

    // Update the user data in the database
    const result = await usersCollection.updateOne(
      { _id: userId },
      { $set: formData }
    );

    if (result.modifiedCount > 0) {
      return res.send({ status: "success", message: "Information updated successfully!" });
    } else {
      return res.send({ status: "error", message: "No changes were made" });
    }
  } catch (error) {
    console.error(error);
    return res.send({ status: "error", message: "Server error", error });
  }
});

module.exports = router;
