//Rutas para especialidad
const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');
//api/turno
router.post('/', turnoController.crearTurno);
router.get('/',turnoController.obtenerTurnos);
router.put('/:id', turnoController.actualizarTurno);
router.delete('/:id', turnoController.eliminarTurno);
router.get('/:paciente_id', turnoController.getTurnosByPaciente);
module.exports = router;