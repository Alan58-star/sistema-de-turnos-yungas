const mongoose = require ('mongoose');
const PacienteSchema = mongoose.Schema({
    dni:{
        type: Number,
        required:true
    },
    telefono:{
        type: String,
        required:true
    },
    nombre:{
        type: String,
        required:true
    },
    passw:{
        type: String,
        required:true
    },
    strikes:{
        type: Number,
        required:false
    }
});

module.exports = mongoose.model('Paciente',PacienteSchema);