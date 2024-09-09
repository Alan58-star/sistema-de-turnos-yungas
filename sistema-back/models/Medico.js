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
    tdisponibles:{
        type: Number
    },
    especialidades:[{type:Schema.Types.ObjectId, ref:'Especialidad'}]
});

module.exports = mongoose.model('Medico',MedicoSchema);