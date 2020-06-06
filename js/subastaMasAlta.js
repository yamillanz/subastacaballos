
const subastaMasAlta = async (target) => {
    let result = '';
    let data  = await (await fetch("subastas.php")).json();
    //data = JSON.parse(data)[0];
    console.log(data);
    
    let dataHTML = `
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
    /* $.get("subastas.php", function (resp)  {
        const data = JSON.parse(resp)[0];
        //console.log("data suba", resp); 
        
        let dataHTML = `
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <div class="jumbotron">
                    <h5>PUJA MAS ALTA - DATOS</h5>
                    <h3 class="diaplay-4">Caballo: ${data.nombre_caballo}</h3>
                    <h3 class="diaplay-4">Usuario: ${data.usuario}</h3>
                    <p>Monto: ${data.cantidad}</p>
                </div>
            </div>
        </div>`

        document.querySelector(target).innerHTML =  dataHTML;

    }); */
    //console.log("resultado ", dataHTML);
    document.querySelector(target).innerHTML =  dataHTML;
    //return dataHTML;
    return new Promise(() => dataHTML);

}

export { subastaMasAlta } 