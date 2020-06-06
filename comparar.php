<?php

include("database.php");

if (isset($_POST["id"]) && !empty($_POST["hashc"])) {
    $db = new db();
    $db = $db->conectar();

    $smt = $db->prepare("SELECT id, hashc FROM usuarios WHERE id = :id AND hashc = :hashc");
    $smt->bindParam(":id", $_POST["id"]);
    $smt->bindParam(":hashc", $_POST["hashc"]);
    $smt->execute();
    $result = $smt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($result[0]);   

}