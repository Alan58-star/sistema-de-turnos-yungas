
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
//Creamos servidor
const app = express();

require('./cron');

conectarDB();
app.use(cors())
app.use(express.json());
app.use('/api/medico', require('./routes/medico'));
app.use('/api/especialidad', require('./routes/especialidad'));
app.use('/api/paciente', require('./routes/paciente'));
app.use('/api/turno', require('./routes/turno'));
app.use('/api/obra', require('./routes/obrasocial'));
//Definimos ruta principal
app.listen(4000, () =>{
    console.log('El servidor esta corriendo')
})