const express = require('express')

const fs = require('fs')

const employeesCollection = require('../models/employees');


const router = express.Router();

router.get('/employees', async (req, res) => {

    try {
        const data = await fs.promises.readFile('./dataJson/employees.json', 'utf8');
        const employees = JSON.parse(data);

        const check = await employeesCollection.find().lean();

        if (check.length === 0) {
            await employeesCollection.insertMany(employees);
            return res.json({ message: "employees uploaded to db" });
        } else {
            return res.json({ message: "employees already in db" });
        }

    } catch (err) {
        return res.status(500).json({ message: "problem in data employees", err });
    }
})

router.post('/employees', async (req, res) => {
    try{
        const {service} = req.body;
        if (!service) {
            return res.status(400).json({ status: "error", message: "Service field is required!" });
        }
        const employees = await employeesCollection.find({service}).lean();
        if(employees){
            return res.json({ status : "success", message: "employee exist", employees});
        }
    }catch (err) {
        return res.status(500).json({ status : "error", message: "problem in data employees", err });
    }
})



module.exports = router