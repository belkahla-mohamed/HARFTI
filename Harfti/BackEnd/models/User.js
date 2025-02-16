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
    image : {
        type : String
    }
})


const usersCollection = mongoose.model('users', userSchema);

module.exports = usersCollection