//Archivo que sirve para iniciar el servidor
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

//Initialitation
const app = express();
//Creo el server con socket.io
const server = http.createServer(app);
//Obtengo la conexion
const io = socketIO(server);

//Settings
app.set('port',process.env.PORT || 3000);

//Mando la conexion del Socket a socket.js que es el servidor
require('./socket')(io);

//Static files
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
server.listen(app.get('port'), () => {
    console.log('Server iniciado en el puerto 3000');
});