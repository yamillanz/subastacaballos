<?php
include("../../database.php");

$db = new db();
$db = $db->conectar();

$smt = $db->prepare("SELECT * FROM caballos");

$smt->execute();

$result = $smt->fetchAll(PDO::FETCH_OBJ);
$db = null;
echo json_encode($result);
