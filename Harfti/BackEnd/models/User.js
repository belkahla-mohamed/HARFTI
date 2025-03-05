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

const reservationSchema = new mongoose.Schema({
    location : {
        lat : Number,
        lng : Number
    },
    image : String,
    contact : String,
    description : String,
    notification: { type: String, default: null },
    userId : { type: mongoose.Schema.Types.ObjectId, ref: "users" }
})


const usersCollection = mongoose.model('users', userSchema);
const reservationsCollection = mongoose.model('reservations', reservationSchema);

module.exports = {usersCollection, reservationsCollection};