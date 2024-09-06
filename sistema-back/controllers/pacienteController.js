const Paciente = require('../models/Paciente');
exports.crearPaciente = async(req,res) => {
    try{
        let paciente;
        //Creamos Paciente
        paciente = new Paciente(req.body);
        await paciente.save();
        res.send(paciente);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.obtenerPacientes = async(req,res) => {
    try{
        const pacientes = await Paciente.find();
        res.send(pacientes);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.actualizarPaciente = async(req,res) => {
    try{
        const{ dni,telefono,nombre,passw}= req.body;
        let paciente =  await Paciente.findById(req.params.id);
        if(!paciente){
            res.status(404).json({msg: 'No existe el paciente'});
        }

        paciente.dni = dni;
        paciente.telefono = telefono;
        paciente.nombre = nombre;
        paciente.passw = passw;
        
        paciente = await Paciente.findOneAndUpdate({_id:req.params.id},paciente,{new:true})
        res.json(paciente);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPaciente = async(req,res) => {
    try{
        let paciente =  await Paciente.findById(req.params.id);
        if(!paciente){
            res.status(404).json({msg: 'No existe el paciente'});
        }
        res.json(medico);

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
exports.eliminarPaciente = async(req,res) => {
    try{
        let paciente =  await Paciente.findById(req.params.id);
        if(!paciente){
            res.status(404).json({msg: 'No existe el paciente'});
        }
        await Paciente.deleteOne({_id:req.params.id});
        res.json({msg: ' Paciente eliminado'});

    }catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}