<?php
/*    $cnnMyql = new PDO("mysql:host=localhost; dbname=remates", "root", "root");
   $cnnMyql->exec("set names utf8");    
?> */

class db
{

    private $host = ""; //'10.1.1.32';
    private $db = ""; //'intranet';
    private $user = ""; //'root';
    private $password = ""; // = '.4C3r04dm1n';
    private $port = '';

    function __construct()
    {
        $this->host =  "157.230.216.250";//"localhost";
        $this->db = "remates";
        $this->user = "root";
        $this->password =  "Acceso01.."; //".4C3r04dm1n";
        $this->port = "3306";
    }

    public function conectar()
    {

        $conexion_mysql = "mysql:host=$this->host;dbname=$this->db";
        $conexion_db = new PDO($conexion_mysql, $this->user, $this->password);
        $conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $conexion_db->exec("set names utf8");

        return $conexion_db;
    }
}
