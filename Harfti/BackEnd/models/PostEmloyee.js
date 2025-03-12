const mongoose = require('mongoose');
const Postschema =new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    prix:{
        type:String,
    },
    photo:{
        type:String
    },

    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }



});



const PostCollection =   mongoose.model('postEmployee',Postschema)
module.exports = PostCollection