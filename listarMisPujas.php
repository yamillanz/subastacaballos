<?php
include("database.php");

if (isset($_GET["usuario"])) {
    $db = new db();
    $db = $db->conectar();

    $smt = $db->prepare("SELECT  a.*,
                        DATE_FORMAT(a.fecha, '%d/%m/%Y - %h:%m %p') fechaf, 
                        (SELECT c.nombre FROM caballos c WHERE c.id = a.caballo) AS nombre_caballo  
                        FROM apuestas a WHERE usuario = :usuario");
     $smt->bindParam(":usuario", $_GET["usuario"]);
    //   $smt->bindParam(":email", $_GET["email"]); */
    $smt->execute();
    $result = $smt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($result);
}
