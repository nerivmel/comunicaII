//Funcion que captura los eventos de un usuario
function init(){

    //Elemento que captura el raton
    let mouse = {
        click : false,
        move : false,
        position: {x: 0, y: 0},
        position_prev: false
    };

    let touch = {
        click : false,
        move : false,
        position: {x: 0, y: 0},
        position_prev: false
    };

    //Captura del canvas
    const canvas = document.getElementById('drawing');
    const context = canvas.getContext('2d');
    //Obtengo el tamaño de la ventana
    const width = window.innerWidth;
    const heigth = window.innerHeight;

    //Cambio el tamaño del canvas dependiendo del tamaño de la ventana
    canvas.width = width;
    canvas.heigth = heigth;


    //Conecto el cliente con el servidor
    const socket = io();

    //Captura el click en el canvas
    canvas.addEventListener('mousedown', (e) => {
        mouse.click = true;
    });
    //Detecta cuando termina clickear
    canvas.addEventListener('mouseup', (e) =>{
        mouse.click = false;
    });

    //Captura el movimiento del mouse
    canvas.addEventListener('mousemove', (e) =>{
        mouse.position.x = e.clientX / width;
        mouse.position.y = e.clientY / 500;
        mouse.move = true;
    });
    
    


    socket.on('draw_line', data=>{
        const line = data.line;
        context.beginPath();
        context.lineWith = 2;
        context.moveTo(line[0].x * width, line[0].y * 500);
        context.lineTo(line[1].x * width, line[1].y * 500);
        context.stroke();
    });

    //Funcion que sirve para saber cuando esta dibujando la persona
    //Envia los datos del cliente al servidor cuando el mouse se mueve
    function mainloop(){
        if(mouse.click && mouse.move && mouse.position_prev){
            
            socket.emit('draw_line',{line:[mouse.position, mouse.position_prev]});
            mouse.move = false;
        }
        mouse.position_prev = {x: mouse.position.x ,y: mouse.position.y};
        //Llamo a la funcion cada cierto tiempo
        setTimeout(mainloop, 25);

    }

    mainloop();


}
//Evento que sabe cuando la pagina esta cargada
document.addEventListener('DOMContentLoaded', init);