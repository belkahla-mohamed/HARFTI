const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express')
const usersCollection = require('./models/User');

const app = express();

app.use(express.json());

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/userDB');

app.post('/create', async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;
        if(!firstName || !lastName || !username || !email || !password){
            return res.json({status : 'error',message : 'append the all inputs !'})
        }
        const check = await usersCollection.findOne({username});
        if (check) {
            return res.json({status : 'error', message : "username already exist!"})
        }
            const user = new usersCollection({ firstName, lastName, username, email, password });
            const result = await user.save();
            if(result){
                return res.json({status : 'success', message : 'user added succesfuly'})
            }

        

    } catch (err) {
        
    res.status(404).json({message : 'problem in added', err})
    }
})

app.post('/login', async (req ,res)=>{
    try{
        const {username , password} = req.body;
        if(!username || !password){
            return res.json({status : 'error' , message : 'append all inputs !'})
        }

        const find = await usersCollection.findOne({username});
        if(!find){
            return res.json({status : "error" , message : "User don't existe"})
        }
        if(find.username === username && find.password === password){
            return res.json({status:"success" , message:"user finded" , user : find})
        }else{
            return res.json({status:"error" , message : "password Incorect"})
        }
    }catch (err) {
        
        res.status(404).json({message : 'problem in login ', err})
        }
})



app.listen(3001, (req, res) => {
    console.log('server is running')
})



