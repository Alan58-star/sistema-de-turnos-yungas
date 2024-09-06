const mongoose = require ('mongoose');
const EspecialidadSchema = mongoose.Schema({
    nombreEsp:{
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Especialidad',EspecialidadSchema);