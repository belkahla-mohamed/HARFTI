const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    username : {
        type : String,
        unique : true
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
})


const usersCollection = mongoose.model('employee', userSchema);

module.exports = usersCollection