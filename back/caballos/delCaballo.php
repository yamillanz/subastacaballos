<?php
include("../../database.php");

if (isset($_GET["idcaballo"])) {
    //$smt = $cnnMyql->prepare("INSERT INTO apuestas (cantidad, usuario, observaciones) VALUES (:cantidad, :usuario, :obs)");

    $db = new db();
    $db = $db->conectar();

    $smt = $db->prepare("DELETE FROM caballos WHERE id=:idcaballo");
    $smt->bindParam(":idcaballo", $_GET["idcaballo"]);
    $smt->execute();


    $db = null;
}
