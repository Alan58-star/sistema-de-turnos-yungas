const Medico = require('../models/Medico');
const Turno = require('../models/Turno');
exports.crearMedico = async(req,res) => {
    try{
        let medico;
        //Creamos Medico
        medico = new Medico(req.body);
        await medico.save();
        res.send(medico);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerMedicos = async(req,res) => {
    try{
        const medicos = await Medico.find({}).populate('especialidades.especialidad_id');
        res.send(medicos);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.actualizarMedico = async(req,res) => {
    try{
        const medico = await Medico.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        //const{ legajo,nombre,apellido}= req.body;
        //let medico =  await Medico.findById(req.params.id);
        if(!medico){
            res.status(404).json({msg: 'No existe el medico'});
        }

       // medico.legajo = legajo;
       // medico.nombre = nombre;
       // medico.apellido = apellido;
        
       // medico = await Medico.findOneAndUpdate({_id:req.params.id},medico,{new:true})
        res.json(medico);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerMedico = async(req,res) => {
    try{
        let medico =  await Medico.findById(req.params.id);
        if(!medico){
            res.status(404).json({msg: 'No existe el medico'});
        }
        res.json(medico);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.eliminarMedico = async(req,res) => {
    try{
        let medico =  await Medico.findById(req.params.id);
        if(!medico){
            res.status(404).json({msg: 'No existe el medico'});
        }
        await Medico.deleteOne({_id:req.params.id});
        res.json({msg: ' Medico eliminado'});

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
// Obtener médicos por especialidad junto con sus turnos disponibles
exports.getMedicosByEspecialidadConTurnosDisponibles = async (req, res) => {
    try {
        const { especialidad_id } = req.params;

        // Encontrar médicos que tienen la especialidad especificada
        const medicos = await Medico.find({ 'especialidades.especialidad_id': especialidad_id });
        
        // Si no se encuentran médicos para la especialidad dada
        if (!medicos || medicos.length === 0) {
            return res.status(404).send({ message: "No se encontraron médicos para esta especialidad." });
        }
        
        // Obtener turnos disponibles para cada médico
        const medicosConTurnos = await Promise.all(medicos.map(async (medico) => {
            const turnos = await Turno.find({ 
                medico_id: medico._id
            });
            return {
                
                medico,
                turnos
            };
        }));
        
        res.send(medicosConTurnos);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
}

