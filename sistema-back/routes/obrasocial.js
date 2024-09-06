//Rutas para medico
const express = require('express');
const router = express.Router();
const obrasocialController = require('../controllers/obrasocialController');
//api/obra

router.post('/', obrasocialController.crearObra);
router.get('/',obrasocialController.obtenerObras);
router.put('/:id', obrasocialController.actualizarObra);
router.get('/:id', obrasocialController.obtenerObra);
router.delete('/:id', obrasocialController.eliminarObra);

module.exports = router;