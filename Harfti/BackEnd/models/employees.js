const mongoose = require('mongoose');


const employeesSchema = new mongoose.Schema({
    fullname : String,
    age : Number,
    service : String,
    contact : {
        tel : Number,
        email : String
    },
    image : String
})


const employeesCollection = new mongoose.model("employees", employeesSchema);


module.exports = employeesCollection;