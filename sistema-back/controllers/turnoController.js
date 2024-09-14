const Turno = require('../models/Turno');
// Crear Turno
exports.crearTurno = async (req, res) => {
    try {
        let turno = new Turno(req.body);
        await turno.save();
        res.json({
            'status': '1',
            'msg': 'Turno creado.'
        })
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error.'
        })
    }
};

exports.obtenerTurno = async(req,res) => {
    try{
        let turno =  await Turno.findById(req.params.id);
        if(!turno){
            res.status(404).json({msg: 'No existe el paciente'});
        }
        res.json(turno);

    }catch(error){
        console.error('Error al obtener la Espe:', error.message);

        if (error.name === 'CastError') {
            // Error de formato de ObjectId
            return res.status(400).json({ msg: 'Formato de ID no válido' });
        }

        res.status(500).send('Hubo un error');
    }
}
// Obtener Todos los Turnos
exports.obtenerTurnos = async (req, res) => {
    try {
        const turnos = await Turno.find({}).populate('medico_id paciente_id obras_sociales.obrasocial_id especialidad_id');
        res.send(turnos);
    } catch (error) {
        res.send(error);
    }
};

// Actualizar Turno
exports.actualizarTurno = async (req, res) => {
    try {
        const turno = await Turno.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!turno) {
            return res.json({
                'status': '1',
                'msg': 'Error',
                
            }) 
        }
        res.json({
            'status': '2',
            'msg': 'Turno creado con exito',
            
        }) 
    } catch (error) {
        res.json({
            'status': '0',
            'msg': 'Error en el server',
            
        }) 
    }
};

// Eliminar Turno
exports.eliminarTurno = async (req, res) => {
    try {
        const turno = await Turno.findByIdAndDelete(req.params.id);
        if (!turno) {
            return res.status(404).send();
        }
        res.status(200).send(turno);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Obtener Turnos de un Paciente
exports.getTurnosByPaciente = async (req, res) => {
    try {
        const { paciente_id } = req.params;
        const turnos = await Turno.find({ paciente_id }).populate('medico_id obra_social_id especialidad_id');
        
        if (turnos.length === 0) {
            return res.status(404).send({ message: "No se encontraron turnos para este paciente." });
        }

        res.send(turnos);
    } catch (error) {
        res.status(500).send('Hubo un error');
    }
};
