<?php
include("database.php");


$db = new db();
$db = $db->conectar();

$smt = $db->query("UPDATE caballos SET habilitado = 0");
//$smt->execute();
//$result = $smt->fetchAll(PDO::FETCH_OBJ);


$smt2 = $db->query("INSERT INTO apuestas_back 
                                    (cantidad, 
                                    usuario, 
                                    observaciones, 
                                    fecha, 
                                    caballo, idapuesta)
                            SELECT cantidad, 
                                    usuario, 
                                    observaciones, 
                                    fecha, 
                                    caballo, id 
                            FROM apuestas");
//$smt2->execute();
//$result2 = $smt2->fetchAll(PDO::FETCH_OBJ);


$smt3 = $db->query("DELETE FROM apuestas");

//$result3 = $smt->fetchAll(PDO::FETCH_OBJ);

$db = null;
echo json_encode("Exito");
