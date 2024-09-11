const Paciente = require('../models/Paciente');
const Turno = require('../models/Turno');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.crearPaciente = async(req,res) => {
   try{     
    let log = await Paciente.find().where('dni').equals(req.body.dni)
        if(log[0]==null){
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
        }else{
            res.json({
                'status': '2',
                'msg': 'Medico Dni, Con el mismo dni'
            })
        }
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
        const paciente = await Medico.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!paciente){
           return res.status(404).json({msg: 'No existe el paciente'});
        }
        res.json(paciente);

    }catch(error){
        console.error('Error al obtener el paciente:', error.message);

        if (error.name === 'CastError') {
            // Error de formato de ObjectId
            return res.status(400).json({ msg: 'Formato de ID no válido' });
        }

        res.status(500).send('Hubo un error');
    }
}

exports.obtenerPaciente = async(req,res) => {
    try{
        let paciente =  await Paciente.findById(req.params.id);
        if(!paciente){
            res.status(404).json({msg: 'No existe el paciente'});
        }
        res.json(paciente);

    }catch(error){
        console.error('Error al obtener la Espe:', error.message);

        if (error.name === 'CastError') {
            // Error de formato de ObjectId
            return res.status(400).json({ msg: 'Formato de ID no válido' });
        }

        res.status(500).send('Hubo un error');
    }
}
exports.eliminarPaciente = async(req,res) => {
    try{
        let paciente =  await Paciente.findById(req.params.id);
        if(!paciente){
            return res.status(404).json({msg: 'No existe el paciente'});
        }
        await Paciente.deleteOne({_id:req.params.id});
        res.json({msg: ' Paciente eliminado'});

    }catch(error){
        console.error('Error al obtener la especialidad:', error.message);

        if (error.name === 'CastError') {
            // Error de formato de ObjectId
            return res.status(400).json({ msg: 'Formato de ID no válido' });
        }

        res.status(500).send('Hubo un error');
    }
}
exports.obtenerTurnosDelPaciente = async (req, res) => {
    try {
        const pacienteId = req.params.pacienteId;

        // Verificar si el paciente existe (opcional, si quieres asegurarte de que el paciente exista)
        let paciente = await Paciente.findById(pacienteId);
        if (!paciente) {
             return res.status(404).json({ msg: 'No existe el paciente' });
        }

        // Obtener turnos del paciente
        let turnos = await Turno.find({ paciente_id: pacienteId })
            .populate('medico_id', 'nombre apellido') // Opcional: Poblar detalles del médico
            .populate('obras_sociales', 'nombreOS') // Opcional: Poblar detalles de las obras sociales
            .exec();

        if (!turnos || turnos.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron turnos para este paciente' });
        }

        res.json(turnos);
    } catch (error) {
        console.error('Error al obtener los turnos del paciente:', error.message);
        res.status(500).send('Hubo un error al obtener los turnos');
    }
}
//LOGIN

exports.register = async(req,res) => {
    try{     
     let log = await Paciente.find().where('dni').equals(req.body.dni)
         if(log[0]==null){
             try{
 
                 let paciente;
                 //Creamos Paciente
                 req.body.passw = bcrypt.hashSync(req.body.passw,12);
                 paciente = new Paciente(req.body);
                 await paciente.save();
                 //res.send(paciente);
                 res.json({
                    'status': '1',
                    'msg': 'Paciente guardado.'
                })
 
             }catch(error){
                 console.log(error);
                 res.json({
                    'status': '0',
                    'msg': 'Error procesando operacion.'
                })
             }
         }else{
             res.json({
                 'status': '2',
                 'msg': 'Medico Dni, Con el mismo dni'
             })
         }
     }catch(error){
         console.log(error);
         res.json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
     }
 }
 exports.login = async(req,res) => {
    try{
     const paciente = await Paciente.findOne({dni: req.body.dni});
     if(!paciente){
        return res.json({
            'status': '2',
            'msg': 'Error en el DNI o contraseña'
        }) 
     }
     else{
        const eq = bcrypt.compareSync(req.body.passw, paciente.passw);
      
        if(!eq){
            return res.json({
                'status': '3',
                'msg': 'Error en el DNI o contraseña',
                
            }) 
        }
        else{
            return res.json({
                'status': '1',
                'msg': 'Login correcto.',
                'token': createToken(paciente),
                'dni': paciente.dni,
                'telefono': paciente.telefono,
                'id': paciente._id,
                'rol':paciente.rol,
                'nombre':paciente.nombre
            })
        }
     }
    }catch(error){
            console.log(error);
            return res.json({
               'status': '0',
               'msg': 'Error procesando operacion.'
           })
        }
}

function createToken(paciente){
    const payload={
        paciente_id:paciente._id,
        paciente_rol:paciente.rol
    }
    return jwt.sign(payload,'en un lugar de las Heras');
}