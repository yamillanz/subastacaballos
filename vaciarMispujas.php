<?php 
    include("database.php");
    
    if (isset($_POST["usuario"])) {
        //$smt = $cnnMyql->prepare("INSERT INTO apuestas (cantidad, usuario, observaciones) VALUES (:cantidad, :usuario, :obs)");
    
        $db = new db();
        $db = $db->conectar();
    
        $smt = $db->prepare("DELETE FROM apuestas WHERE usuario = :usuario");
        $smt->bindParam(":usuario", $_POST["usuario"]);
        $smt->execute();    
    
        $db = null;
        echo json_encode("{id:'Borrado Existoso'}");
    }
    
