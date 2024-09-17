//Rutas para medico
const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
//api/medico

router.post('/', medicoController.crearMedico);
router.get('/',medicoController.obtenerMedicos);
router.put('/:id', medicoController.actualizarMedico);
router.get('/:id', medicoController.obtenerMedico);
router.delete('/:id', medicoController.eliminarMedico);
//router.get('/especialidad/:especialidad_id',medicoController.getMedicosByEspecialidadConTurnosDisponibles);
router.get('/especialidad/:especialidad_id',medicoController.obtenerMedicosporEspecialidad);
router.get('/turnos/:medicoId',medicoController.obtenerTurnosDelMedico);
router.get('/turnosdisp/:medicoId',medicoController.obtenerTurnosDelMedicoDisp);

router.get('/busqueda/:termino',medicoController.obtenerMedicoTermino);
router.get('/turnos/:medicoId/especialidad/:especialidadId',medicoController.obtenerTurnosMedicoEsp);
router.get('/turnosdisp/:medicoId/especialidad/:especialidadId',medicoController.obtenerTurnosMedicoEspDisponibles);
module.exports = router;