<?php

  // não deixe quebra de linha nos headers abaixo
 require ('../include/config.inc.php');
 
  // não deixe quebra de linha nos headers abaixo
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  header("Content-Type: application/json; charset=utf-8");
 
  // vamos obter os dados vindo do formulário
  // atenção: em um código real temos que validar
  $dados = file_get_contents("php://input");
   
  // a requisição foi post?
  if(isset($dados) && !empty($dados)){
	switch($dados) {
		case 'bordas':
$query = "SELECT * FROM bordas";
$result = mysqli_query($con, $query);	
$i=0;

if ($result->num_rows > 0)
{
while($row = $result->fetch_assoc()) 
{
$pedidos[$i] = array(intval($row["id"]),$row["titulo"]);

$i++;
}
echo json_encode($pedidos);
}
break;
	}
	}
?>
