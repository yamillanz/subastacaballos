//import { router } from "./routes/router.js"
const ajustaNavegacion = () => {
    /*  const prom = new Promise($("#navegacion").load("./views/nav.html"));
     await prom; */

    $("#navegacion").load("./views/nav.html", function () {
        const usuario = JSON.parse(localStorage.getItem("localUsr"));
        //Seleccionamos el select
        if (usuario) {
            var barraLogin = document.getElementById("barraLogin");
            var option = document.createElement("li");
            option.className = "nav-item";
            option.id = "logoutElem";
            option.innerHTML = `<button class="btn btn-secondary" id="logout">Logout</button>`;
            barraLogin.appendChild(option);
            $("#logout").click(function () {
                localStorage.clear();
                window.location = "/subastacaballos";

            })

            var barraApostar = document.getElementById("opcionesIzq");
            var option2 = document.createElement("li");
            option2.className = "nav-item";
            option2.id = "linkApostar";
            option2.innerHTML = `<a class="nav-link" href="#/apostar">Pujar</a>`;
            barraApostar.appendChild(option2);

            if (usuario.typeu == 10) {
                var option3 = document.createElement("li");
                option3.className = "nav-item";
                option3.id = "linkSubasta";
                option3.innerHTML = `<a class="nav-link" href="#/subasta">Subasta Actual</a>`;
                barraApostar.appendChild(option3);

                var option4 = document.createElement("li");
                option4.className = "nav-item";
                option4.id = "linkCaballos";
                option4.innerHTML = `<a class="nav-link" href="#/caballos">Caballos</a>`;
                barraApostar.appendChild(option4);
            }

        }

    })
    return new Promise(() => true);

    //console.log(document.getElementById("logoutElem"));
    //barraLogin.removeChild();
    // document.getElementById("logoutElem") == null ? "" : 

}

export { ajustaNavegacion };