//Servidor
//Funcion que recibe una conexion nueva
module.exports = io => {

    var line_history = [];

    io.on('connection', socket=>{
        console.log('Nuevo usuario conectado');

        for(let i in line_history){
            socket.emit('draw_line', {line : line_history[i]});
        }
        //socket.emit('draw_line',)

        socket.on('draw_line', data =>{
            line_history.push(data.line);
            io.emit('draw_line', data);
        });
    });

    

}

    
