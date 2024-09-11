const {mongoose, Schema} = require ('mongoose');
const PacienteSchema = mongoose.Schema({
    dni:{
        type: Number,
        required:true
    },
    nombre:{
        type: String,
        required:true
    },
    telefono:{
        type: String,
        required:true
    },
    passw:{
        type: String,
        required:true
    },
    strikes:{
        type: Number,
        required:false,
        default:0
    },
    rol:{
        type: String,
        required:false,
        default: 'paciente'
    }
});

module.exports = mongoose.model('Paciente',PacienteSchema);