
function cargar_caballos() {
    $.get("back/caballos/listadoCaballos.php", function (resp) {
        const caballos = JSON.parse(resp);
        let html = "";
        let classhab = "";
        //console.log("caballos", caballos);
        caballos.forEach(caballo => {
            classhab = caballo.habilitado == "1" ? "btn-outline-success" : "btn-outline-danger"
            html += `
            <tr class="table-dark" idcaballo=${caballo.id} hab=${caballo.habilitado}>
                <td>${caballo.id}</td>
                <td>${caballo.nombre}</td>
                <td>${caballo.creacion}</td>
                <td>${caballo.obs}</td> 
                <td>
                    <button class="btn btn-outline-danger btn-sm mybtn-delete">D</button>
                    <button class="btn ${classhab} btn-sm mybtn-habil">H</button>
                </td>
            </tr> `;
        });

        //<td>${puja.observaciones}</td>
        $("#bodyCaballos").html(html);

    })
}

$(document).ready(async function () {
    const usuario = JSON.parse(localStorage.getItem("localUsr"));
    cargar_caballos();

    $("#ingresar").click(function (e) {
        const dataPost = {
            nombre: $('#nombre').val(),
            obs: $('#observaciones').val(),
            habilitado: $('#habilitado').prop("checked") ? 1 : 0
        }
        //console.log("data", dataPost);
        $.post("back/caballos/addCaballo.php", dataPost);
        $.toast({
            heading: 'Success',
            text: 'Caballo Insertado',
            showHideTransition: 'slide',
            icon: 'success',
            position: 'bottom-center'
        })
        cargar_caballos();
    });


    $(document).on('click', ".mybtn-delete", function (e) {
        let idcaballo = $($(this)[0].parentElement.parentElement).attr('idcaballo');
        $.get("back/caballos/delCaballo.php?idcaballo=" + idcaballo, (resp) => {console.log(resp);})  ;
        //console.log("caballo", idcaballo);
        cargar_caballos();
    });

    $(document).on('click', ".mybtn-habil", function (e) {
        let idcaballo = $($(this)[0].parentElement.parentElement).attr('idcaballo');
        let habili = $($(this)[0].parentElement.parentElement).attr('hab');
        const dataPost = {
            idcaballo: idcaballo,
            habilitado: habili == 0 ? 1 : 0
        }
        //console.log("data", dataPost);
        $.post("back/caballos/habilitarCaballo.php", dataPost, (resp)=>{console.log(resp);});
        cargar_caballos();
    });

})