const mongoose = require ('mongoose');
const ObraSocialSchema = mongoose.Schema({
    nombreOS:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('ObraSocial',ObraSocialSchema);