const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    id : Number,
    icon : String,
    title : String
})

const servicesCollection = mongoose.model('services', servicesSchema);

module.exports = servicesCollection