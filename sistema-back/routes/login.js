const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/register',pacienteController.register);
router.post('/login',pacienteController.login);

// Rutas para recuperación de contraseña
router.post('/request-password-reset', pacienteController.requestPasswordReset);
router.post('/reset-password', pacienteController.resetPassword);
router.post('/reset-sintoken', pacienteController.resetPasswordSinToken);


module.exports = router;