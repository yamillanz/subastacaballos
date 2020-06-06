<?php
include("database.php");

if (isset($_POST["cantidad"]) && !empty($_POST["obs"] && !empty($_POST["caballo"]))) {
    //$smt = $cnnMyql->prepare("INSERT INTO apuestas (cantidad, usuario, observaciones) VALUES (:cantidad, :usuario, :obs)");

    $db = new db();
    $db = $db->conectar();

    $smt = $db->prepare("INSERT INTO apuestas (cantidad, usuario, observaciones, caballo) 
                        VALUES (:cantidad, :usuario, :obs, :caballo)");
    $smt->bindParam(":cantidad", $_POST["cantidad"]);
    $smt->bindParam(":usuario", $_POST["usuario"]);
    $smt->bindParam(":obs", $_POST["obs"]);
    $smt->bindParam(":caballo", $_POST["caballo"]);
    $smt->execute();


    $db = null;
}
