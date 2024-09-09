//Rutas para especialidad
const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');
//api/turno
router.post('/', turnoController.crearTurno);
router.get('/',turnoController.obtenerTurnos);
router.get('/:id',turnoController.obtenerTurno);
router.put('/:id', turnoController.actualizarTurno);
router.delete('/:id', turnoController.eliminarTurno);
router.get('/paciente/:paciente_id', turnoController.getTurnosByPaciente);
module.exports = router;