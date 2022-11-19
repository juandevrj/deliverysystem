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
  
//Pega data/hora agora
$timezone = new DateTimeZone('America/Sao_Paulo');
$agora = new DateTime('now', $timezone);
$data_agora = $agora->format('d/m/Y H:i');
  
  // a requisição foi post?
  if(isset($dados) && !empty($dados)){
	  
$jsonIterator = json_decode($dados, TRUE);

if($jsonIterator['status'] == "Pedido em Preparação"){
$stats = "data_pedido_aceito";
}elseif($jsonIterator['status'] == "Saiu para Entrega"){
$stats = "data_pedido_pronto";
}elseif($jsonIterator['status'] == "Pedido Entregue"){
$stats = "data_pedido_entregue";
}elseif($jsonIterator['status'] == "Pedido Cancelado"){
$stats = "data_pedido_entregue";
}
 
//verifica se existe pedidos do cliente (token)
$query = "UPDATE pedidos SET " . $stats . "='" . $data_agora . "', status='" . $jsonIterator['status'] ."' WHERE id = '" . $jsonIterator['id'] . ".'";
$result = mysqli_query($con, $query);	
$i=0;


  }
?>