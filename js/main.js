import { router } from "./routes/router.js"
import { ajustaNavegacion } from "./ajustarNav.js"

//jquery
/* async function main() {
   router().then(() => { });
   ajustaNavegacion().then(() => { });

}
main(); */

//await router();
$(window).bind( 'hashchange', function(){
   //var hash = location.hash;
   //window.location.hash = "#/ingresar";
   router(window.location.hash).then(()=>{});
});

$(document).ready(async function () { 

   router().then(() => { });
   ajustaNavegacion().then(() => { });

   //await Promise.resolve(ajustaNavegacion());
   //$("#navegacion").load("./views/nav.html");


   //$("#approuter").load("./views/ingreso.html");
})

