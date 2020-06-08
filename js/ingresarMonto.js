async function cargar_select() {
    let caballosActivos = await Promise.resolve($.get("todosCaballos.php", (resp) => resp));
    caballosActivos = JSON.parse(caballosActivos).filter((caballo) => caballo.habilitado == "1");
    //caballosActivos = JSON.parse(caballosActivos);
    //console.log("caballos", caballosActivos)
    var select = document.getElementById("caballos"); //Seleccionamos el select
    select.innerHTML = "";
    console.log("llamo");
    
    for (var i = 0; i < caballosActivos.length; i++) {
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = caballosActivos[i].nombre; //Metemos el texto en la opción
        option.value = caballosActivos[i].id;
        select.appendChild(option); //Metemos la opción en el select
    }
}

async function getDataMasAlta(target) {
    let data = (await (await fetch("subastas.php")).json())[0];
    let dataHTML = ``;
    if (!data) {
        dataHTML = ` <div class="row">
        <div class="col-sm-12 col-md-12">
            <div class="jumbotron">
                <h5>SIN PUJAS</h5>                
            </div>
        </div>`
    } else {
        dataHTML = `
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <div class="jumbotron">
                        <h5>PUJA MAS ALTA - DATOS</h5>
                        <h3 class="diaplay-4">Caballo: ${data.nombre_caballo}</h3>
                        <h3 class="diaplay-4">Usuario: ${data.usuario}</h3>
                        <p>Monto: ${data.cantidad}</p>
                    </div>
                </div>
            </div>`;
    }
    document.querySelector(target).innerHTML = dataHTML;
}

function cargar_mispujas() {
    const usuario = JSON.parse(localStorage.getItem("localUsr"));
    $.get(`listarMisPujas.php?usuario=${usuario.id}`, function (resp) {
        const mispujas = JSON.parse(resp);
        let html = "";
        //console.log("mis", mispujas);
        mispujas.forEach(puja => {
            html += `
            <tr class="table-dark" idpuja=${puja.id}>
                <td>${puja.id}</td>
                <td>${puja.nombre_caballo}</td>
                <td>${puja.cantidad}</td>
                <td>${puja.fechaf}</td> 
                
            </tr> `;
        });

        //<td>${puja.observaciones}</td>
        $("#bodyPujas").html(html);

    })
}

async function verifyCaballoSubastado() {
    let data = await (await fetch("todosCaballos.php")).json()
    let caballosAsubasta = data.filter((caballo) => caballo.habilitado == 1);
    return (caballosAsubasta.length <= 0);
    //return true;
}

$(document).ready( async function () {
    const usuario = JSON.parse(localStorage.getItem("localUsr"));
    document.getElementById("nombreUsr").innerHTML = "Usuario NRO.: " + usuario.id;
    let intervalo = null;

    getDataMasAlta("#datosSubasta");
    cargar_select();
    cargar_mispujas();

    //console.log("dev", await verifyCaballoSubastado() );
    $("#pujar").prop('disabled', (await verifyCaballoSubastado()));

    intervalo = setInterval(async () => {
        getDataMasAlta("#datosSubasta");
        $("#pujar").prop('disabled', (await verifyCaballoSubastado()));
        cargar_select();
        getDataMasAlta("#datosSubasta");
        //console.log("LLamo!!!");
        
    }, 3000)

    $("#pujar").click(function (e) {
        const dataPost = {
            cantidad: $('#monto').val(),
            obs: $('#observaciones').val(),
            usuario: usuario.id,
            caballo: $('#caballos').val()
        }
        //console.log("data", dataPost);
        $.post("addApuesta.php", dataPost);
        $.toast({
            heading: 'Success',
            text: 'Puja Insertada, Corrobore si es la mayor de todas',
            showHideTransition: 'slide',
            icon: 'success',
            position: 'bottom-center'
        })

        cargar_mispujas();

    });

    $("#vaciar").click(function (e) {
        const usuario = JSON.parse(localStorage.getItem("localUsr"));
        console.log("usa", usuario.id);

        $.post("vaciarMispujas.php", { usuario: usuario.id }, (resp) => {
            //console.log("resp", resp);
        });
        $.toast({
            heading: 'Information',
            text: 'Vaciadas sus pujas',
            showHideTransition: 'slide',
            icon: 'info',
            position: 'bottom-center'
        });
        cargar_mispujas();
    });


})