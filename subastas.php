<?php
include("database.php");


$db = new db();
$db = $db->conectar();

$smt = $db->prepare("SELECT a.*,
                            DATE_FORMAT(a.fecha, '%d/%m/%y %h:%m %p') fechaf, 
                            (SELECT c.nombre FROM caballos c WHERE c.id = a.caballo) AS nombre_caballo,
                            (SELECT u.email FROM usuarios u WHERE u.id = a.usuario) correo_usr
                    FROM apuestas a 
                    ORDER BY a.cantidad DESC LIMIT 10");
$smt->execute();
$result = $smt->fetchAll(PDO::FETCH_OBJ);
$db = null;
echo json_encode($result);
