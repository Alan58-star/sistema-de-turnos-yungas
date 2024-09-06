const Turno = require('../models/Turno');
// Crear Turno
exports.crearTurno = async (req, res) => {
    try {
        let turno = new Turno(req.body);
        await turno.save();
        res.status(201).send(turno);
    } catch (error) {
        res.status(400).send(error);
    }
};

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
            return res.status(404).send();
        }
        res.status(200).send(turno);
    } catch (error) {
        res.status(400).send(error);
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
