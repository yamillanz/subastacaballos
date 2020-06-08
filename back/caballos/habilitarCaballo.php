<?php
include("../../database.php");

if (isset($_POST["idcaballo"]) && isset($_POST["habilitado"])) {
    //$smt = $cnnMyql->prepare("INSERT INTO apuestas (cantidad, usuario, observaciones) VALUES (:cantidad, :usuario, :obs)");

    $db = new db();
    $db = $db->conectar();

    $smt = $db->prepare("UPDATE caballos SET habilitado = :habilitado WHERE id=:idcaballo");
    $smt->bindParam(":idcaballo", $_POST["idcaballo"]);
    $smt->bindParam(":habilitado", $_POST["habilitado"]);
    $smt->execute();

    /* $result = $smt->fetchAll(PDO::FETCH_OBJ);
    echo json_encode($result); */

    $db = null;
}
