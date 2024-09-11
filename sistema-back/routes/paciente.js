//Rutas para paciente
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
//api/paciente

router.post('/', pacienteController.crearPaciente);
router.get('/',pacienteController.obtenerPacientes);
router.put('/:id', pacienteController.actualizarPaciente);
router.get('/:id', pacienteController.obtenerPaciente);
router.delete('/:id', pacienteController.eliminarPaciente);
router.get('/turnos/:pacienteId', pacienteController.obtenerTurnosDelPaciente);
router.post('/register',pacienteController.register);
router.post('/login',pacienteController.login);

module.exports = router;