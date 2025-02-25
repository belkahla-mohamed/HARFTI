const express = require("express");
const router = express.Router();
const employeesCollection = require("../models/employees");

router.get("/workers", async (req, res) => {
    try {
        const workers = await employeesCollection.find();
        
        if (workers.length > 0) {
            res.send({ status: "success", message: "Workers found successfully", workers });
        } else {
            res.send({ status: "error", message: "No workers found" });
        }
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).send({ status: "error", message: "Server error", error });
    }
});

module.exports = router;