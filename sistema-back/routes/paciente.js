//Rutas para paciente
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
//api/paciente

router.post('/', pacienteController.crearPaciente);
router.get('/',pacienteController.obtenerPacientes);
router.get('/usuarios',pacienteController.obtenerUsuarios);
router.get('/pacientes',pacienteController.obtenerSoloPacientes);

router.get('/ban',pacienteController.obtenerPacientesStrikes);
router.put('/:id', pacienteController.actualizarPaciente);
router.get('/:id', pacienteController.obtenerPaciente);
router.get('/termino/:termino', pacienteController.obtenerPacienteTermino);

router.get('/terminoSec/:termino', pacienteController.obtenerPacienteTerminoSec);
router.delete('/:id', pacienteController.eliminarPaciente);
router.get('/turnos/:pacienteId', pacienteController.obtenerTurnosDelPaciente);
router.post('/register',pacienteController.register);
router.post('/login',pacienteController.login);

// Rutas para recuperación de contraseña
router.post('/request-password-reset', pacienteController.requestPasswordReset);
router.post('/reset-password', pacienteController.resetPassword);


module.exports = router;