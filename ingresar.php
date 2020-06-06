<?php
include("database.php");

if (isset($_POST["email"]) && !empty($_POST["pass"])) {
    $db = new db();
    $db = $db->conectar();

    $smt = $db->prepare("SELECT id, hashc, typeu FROM usuarios WHERE pass = :pass AND email = :email");
    $smt->bindParam(":pass", $_POST["pass"]);
    $smt->bindParam(":email", $_POST["email"]);
    $smt->execute();
    $result = $smt->fetchAll(PDO::FETCH_OBJ);
    $db = null;
    echo json_encode($result);   

}