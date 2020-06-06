//
import { router } from "./routes/router.js"
import { ajustaNavegacion } from "./ajustarNav.js"

$("#btnIngresarSistema").click(function (e) { //$("#formIgreso").submit(function (e) {
    //e.preventDefault();
    
    //console.log("Entro vea!!");

    let datosPost = {
        email: $("#inputEmail").val(),
        pass: $("#inputPassword").val()
    };
    let url = "ingresar.php";

    //window.dispatchEvent(new HashChangeEvent("#/"));

    $.post(url, datosPost, function (response) {
        const usuario = JSON.parse(response)[0];
        //console.log("es", response); 
        
        //$("#formIgreso").trigger("reset");
        if (!usuario) {
            alert("Usuario y contraseña invalida");
            return false;
        }
        localStorage.setItem("localUsr", JSON.stringify({ id: usuario.id, hash: usuario.hashc, typeu: usuario.typeu }))
        
        router("#/apostar").then(() => { });
        ajustaNavegacion().then(() => { });

    });
});


//});