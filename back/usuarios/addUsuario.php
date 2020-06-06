<?php
include("../../database.php");

if (isset($_POST["nombre"]) && !empty($_POST["obs"] && !empty($_POST["habilitado"]))) {
    //$smt = $cnnMyql->prepare("INSERT INTO apuestas (nombre, obs, observaciones) VALUES (:nombre, :obs, :obs)");

    $db = new db();
    $db = $db->conectar();

    $smt = $db->prepare("INSERT INTO caballos (nombre, obs, habilitado) 
                        VALUES (:nombre, :obs, :habilitado)");
    $smt->bindParam(":nombre", $_POST["nombre"]);
    $smt->bindParam(":obs", $_POST["obs"]);
    $smt->bindParam(":habilitado", $_POST["habilitado"]);
    $smt->execute();


    $db = null;
}
