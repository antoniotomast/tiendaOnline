const http = require('http');
const app = require('./src/app');

// Config de .env
require('dotenv').config();

// Config DB
require('./src/config/db');

//Creamos el servidor
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
server.listen(PORT);

//Ponemos el servidor a escuchar
server.on('listening', () => console.log(`Servidor escuchando en puerto ${PORT}`));