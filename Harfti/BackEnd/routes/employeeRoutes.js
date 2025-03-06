const express = require('express')

const fs = require('fs')

const employeesCollection = require('../models/employees');


const router = express.Router();
const multer = require('multer');
const path = require('path')


router.get("/employees", async (req, res) => {
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
const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        cb(null , "EmployeePhotos/")
    },
    filename:(req , file , cb)=>{
        cb(null,  Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({storage})

router.post('/RegisterEmploye', upload.single('photo') , async (req, res) => {

    try{
        const {email,phone,...formData} = req.body;
        console.log({email, phone });
        

        console.log(formData);
        if (!formData || !email || !phone) {
            return res.status(400).json({ status: "error", message: "employee Info field is required!" });
        }
        const imageName = req.file ? req.file.filename : formData.photo.name;
        const employees = await employeesCollection({...formData, contact:{
            tel:phone,
            email:email,
        },
        photo:imageName
    })
        await employees.save();

        if(employees){
            return res.json({ status : "success", message: "employee exist", employees});
        }
    }catch (err) {
        return res.status(500).json({ status : "error", message: "problem in data employees", err });
    }
})



module.exports = router