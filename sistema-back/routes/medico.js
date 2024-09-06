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
router.get('/especialidad/:especialidad_id',medicoController.getMedicosByEspecialidadConTurnosDisponibles);


module.exports = router;