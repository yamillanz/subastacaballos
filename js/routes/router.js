const router = async (route) => {
     let ruta = route;


    //Pequeño mal echo hack para eliminar todos los inervalos creados en las otras paginas -- mejorar
    for(let i=0; i<10000; i++)
    {
        window.clearInterval(i);
    }
    //*** ------

    switch (ruta) {
        case "/": {
            $("#approuter").load("views/bienvenido.html");
            break;
        }
        case "#/": {
            $("#approuter").load("views/bienvenido.html");
            break;
        }
        case "#/apostar": {
            $("#approuter").load("views/apostar.html");
            break;
        }
        case "#/ingresar": {
            $("#approuter").load("views/ingreso.html");
            break;
        }
        case "#/subasta": {
            $("#approuter").load("views/subasta.html");
            break;
        }
        case "#/caballos": {
            $("#approuter").load("views/caballos.html");
            break;
        }
        default:
            $("#approuter").load("views/bienvenido.html");
            break;
    }
    //ajustaNavegacion();
    return new Promise(()=>true);
}

export { router }
