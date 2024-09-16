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
exports.obtenerTurnosHoy = async (req, res) => {
    try {
        // Obtener la fecha de hoy al inicio del día y al final del día
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); // Inicio del día (00:00:00)
        const mañana = new Date(hoy);
        mañana.setDate(hoy.getDate() + 1); // Fin del día (23:59:59)

        // Buscar los turnos entre las fechas de hoy
        const turnos = await Turno.find({
            fecha: {
                $gte: hoy, // Mayor o igual que el inicio del día
                $lt: mañana // Menor que el inicio del siguiente día
            }
        }).populate('medico_id paciente_id obras_sociales.obrasocial_id especialidad_id');

        res.send(turnos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener turnos de hoy", error });
    }
};
exports.obtenerTurnosPorFecha = async (req, res) => {
    try {
        const fechaParametro = new Date(req.params.fecha); // Fecha enviada como parámetro en formato 'yyyy-mm-dd'
        fechaParametro.setHours(0, 0, 0, 0); // Inicio del día
        fechaParametro.setDate(fechaParametro.getDate()+1);
        const siguienteDia = new Date(fechaParametro);
        siguienteDia.setDate(fechaParametro.getDate() + 1); // Fin del día
      
        // Buscar los turnos entre la fecha especificada
        const turnos = await Turno.find({
            fecha: {
                $gt: fechaParametro, // Mayor o igual que el inicio del día
                $lte: siguienteDia // Menor que el inicio del siguiente día
            }
        }).populate('medico_id paciente_id obras_sociales.obrasocial_id especialidad_id');

        res.send(turnos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener turnos de la fecha", error });
    }
};
/*exports.obtenerTurnosPorMedico = async (req, res) => {
    try {
        const searchTerm = req.params.termino; // Puede ser nombre o legajo (parcial)
        
        // Buscar los turnos donde el nombre o el legajo del médico coincidan parcialmente
        const turnos = await Turno.find({
            $or: [
                { 'medico_id.nombre': { $regex: searchTerm, $options: 'i' } }, // Nombre parcial (insensible a mayúsculas/minúsculas)
                { 'medico_id.legajo': { $regex: searchTerm, $options: 'i' } }  // Legajo parcial
            ]
        }).populate('medico_id paciente_id obras_sociales.obrasocial_id especialidad_id');
        console.log(turnos);
        res.send(turnos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener turnos por médico", error });
    }
};*/
exports.obtenerTurnosPorMedico = async (req, res) => {
    try {
        const searchTerm = req.params.termino; // Puede ser nombre o legajo (parcial)
        
        // Usamos agregación para buscar por campos dentro de la referencia poblada
        const turnos = await Turno.aggregate([
            {
                $lookup: {
                    from: 'medicos', // Nombre de la colección de médicos
                    localField: 'medico_id',
                    foreignField: '_id',
                    as: 'medico'
                }
            },
            { $unwind: '$medico' }, // Descomponer array resultante de $lookup
            {
                $match: {
                    $or: [
                        { 'medico.nombre': { $regex: searchTerm, $options: 'i' } }, // Nombre parcial insensible a mayúsculas/minúsculas
                        { 'medico.legajo': { $regex: searchTerm, $options: 'i' } }   // Legajo parcial
                    ]
                }
            },
            {
                $lookup: {
                    from: 'pacientes', // Nombre de la colección de pacientes
                    localField: 'paciente_id',
                    foreignField: '_id',
                    as: 'paciente'
                }
            },
            
            { $unwind: { path: '$paciente', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'especialidads', // Nombre de la colección de especialidades
                    localField: 'especialidad_id',
                    foreignField: '_id',
                    as: 'especialidad'
                }
            },
            { $unwind: '$especialidad' },
            {
                $lookup: {
                    from: 'obrasociales', // Nombre de la colección de obras sociales
                    localField: 'obras_sociales',
                    foreignField: '_id',
                    as: 'obras_sociales'
                }
            }
        ]);
        res.send(turnos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener turnos por médico", error });
    }
};
exports.obtenerTurnosPorPaciente = async (req, res) => {
    try {
        const searchTerm = req.params.termino; // Puede ser nombre o DNI (parcial)
       
        // Usamos agregación para buscar por campos dentro de la referencia poblada
        const turnos = await Turno.aggregate([
            {
                $lookup: {
                    from: 'pacientes', // Nombre de la colección de pacientes
                    localField: 'paciente_id',
                    foreignField: '_id',
                    as: 'paciente'
                }
            },
            { $unwind: '$paciente'}, // Descomponer array resultante de $lookup
            {
                $match: {
                    $or: [
                        { 'paciente.nombre': { $regex: searchTerm, $options: 'i' } }, // Nombre parcial insensible a mayúsculas/minúsculas
                        { 'paciente.dni': { $regex: searchTerm, $options: 'i' } }   // DNI parcial
                    ]
                }
            },
            {
                $lookup: {
                    from: 'medicos', // Nombre de la colección de médicos
                    localField: 'medico_id',
                    foreignField: '_id',
                    as: 'medico'
                }
            },
            { $unwind: '$medico' }, // Descomponer array resultante de $lookup
            {
                $lookup: {
                    from: 'especialidads', // Nombre de la colección de especialidades
                    localField: 'especialidad_id',
                    foreignField: '_id',
                    as: 'especialidad'
                }
            },
            { $unwind: '$especialidad' }, // Descomponer array resultante de $lookup
            {
                $lookup: {
                    from: 'obrasociales', // Nombre de la colección de obras sociales
                    localField: 'obras_sociales',
                    foreignField: '_id',
                    as: 'obras_sociales'
                }
            }
        ]);

        res.send(turnos);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener turnos por paciente", error });
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
        console.log(error);
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
