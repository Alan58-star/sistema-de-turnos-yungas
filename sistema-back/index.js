
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const {checkToken} = require('./utils/middleware')
//Creamos servidor
const app = express();

require('./cron');

conectarDB();
app.use(cors())
app.use(express.json());
app.use('/api/login',require('./routes/login'));
app.use('/api/medico',checkToken, require('./routes/medico'));
app.use('/api/especialidad',checkToken, require('./routes/especialidad'));
app.use('/api/paciente',checkToken, require('./routes/paciente'));
app.use('/api/turno',checkToken, require('./routes/turno'));
app.use('/api/obra',checkToken, require('./routes/obrasocial'));
//Definimos ruta principal
app.listen(4000, () =>{
    console.log('El servidor esta corriendo')
})