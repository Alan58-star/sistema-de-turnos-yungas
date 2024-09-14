const mongoose = require ('mongoose');
const Especialidad = require('./Especialidad');
const {Schema, Document} = mongoose;

const MedicoSchema = mongoose.Schema({
    legajo:{
        type: Number,
        required:true
    },
    nombre:{
        type: String,
        required:true
    },
    apellido:{
        type: String,
        required:true
    },
    especialidades:[{type:Schema.Types.ObjectId, ref:'Especialidad'}],
    disponibles:{
        type: Number,
        default:0
    },
});

module.exports = mongoose.model('Medico',MedicoSchema);