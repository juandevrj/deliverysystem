<?php
// vamos efetuar a conexão com o banco
    $con = new mysqli("localhost", "jroot", "password", "database");
    
    // conexão efetuada com sucesso?
    if($con->connect_errno){
      echo "Não foi possível efetuar a conexão: " . 
        $mysqli->connect_error;
      exit(); // vamos sair daqui 
    }  



?>