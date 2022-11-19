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
		case 1:
		
$query = "SELECT * FROM promocao";
$result = mysqli_query($con, $query);	
$i=0;

if ($result->num_rows > 0)
{
while($row = $result->fetch_assoc()) 
{
$pedidos[$i] = array(intval($row["id"]),$row["pizza1"],intval($row["valor"]),intval($row["qntsabor1"]),intval($row["borda1"]),$row["pizza2"],intval($row["qntsabor2"]),intval($row["borda2"]),intval($row["bebida"]));

$i++;
}
echo json_encode($pedidos);
}
break;
		
		
	}
	}
?>