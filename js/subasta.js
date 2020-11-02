//import { router } from "./routes/router.js"
//import { subastaMasAlta } from "./subastaMasAlta.js"




//caballoSubastado().then((data)=>{console.log("caballo", data);})


//caballoSubastado()

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

async function setearTablaSubastas(target) {
    let data = (await (await fetch("subastas.php")).json());
    let html = '';
    if (data) {
        data.forEach(puja => {
            html += `
            <tr class="table-dark" idpuja=${puja.id}>
                <td>${puja.id}</td>
                <td>${puja.usuario} (${puja.correo_usr})</td>
                <td>${puja.cantidad}</td>
                <td>${puja.fechaf}</td> 
                <td>${puja.observaciones}</td> 
                
            </tr> `;
        });
    }
    document.querySelector(target).innerHTML = html;
}

/* function main() {
    getDataMasAlta("#datosSubasta");
    setearTablaSubastas("#bodyPujas");
    intervalo = setInterval(() => {
        getDataMasAlta("#datosSubasta");
        setearTablaSubastas("#bodyPujas");
    }, 3000)
}
 */


$(document).ready(async function () {
    let intervalo = null;
    const caballoSubastado = async () => {
        let data = (await (await fetch("todosCaballos.php")).json())
        return data.filter((caballo) => caballo.habilitado == 1);
    }

    getDataMasAlta("#datosSubasta");
    setearTablaSubastas("#bodyPujas");
    $("#btnPararSubasta").prop('disabled', true);

    const caballo = await caballoSubastado();
    if (caballo.length <= 0) {
        return false;
    }

    $("#btnPararSubasta").prop('disabled', false);
    intervalo = setInterval(async () => {
        getDataMasAlta("#datosSubasta");
        setearTablaSubastas("#bodyPujas");
        //console.log("llamo");
        const caballo = await caballoSubastado();
        if (caballo.length <= 0) {
            $("#btnPararSubasta").prop('disabled', true);
            clearInterval(intervalo);
        }

    }, 3000)

    $("#btnPararSubasta").click(async function () {

        //fetch("pararSubasta.php").then((resp) => console.log("res", resp));
        await fetch("pararSubasta.php");
        //console.log("parar, ",  resp);
        getDataMasAlta("#datosSubasta");
        setearTablaSubastas("#bodyPujas");
        $.toast({
            heading: 'Success',
            text: 'Se detuvo la subasta',
            showHideTransition: 'slide',
            icon: 'success',
            position: 'bottom-center'
        })
        //clearInterval(intervalo);
    })
    //console.log("intervalo ", intervalo);
    //$("#approuter").load("./views/ingreso.html");
})

