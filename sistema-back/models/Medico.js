const mongoose = require ('mongoose');
const Especialidad = require('./Especialidad');
const {Schema} = mongoose;
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
    especialidades:[{
        especialidad_id:{type:Schema.Types.ObjectId, ref:'Especialidad'},
        nombre:String
    }]
});

module.exports = mongoose.model('Medico',MedicoSchema);