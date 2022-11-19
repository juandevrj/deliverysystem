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
 
//verifica se existe pedidos do cliente (token)
$query = "SELECT * FROM pedidos GROUP BY data_pedido_criado ORDER BY data_pedido_criado DESC LIMIT 50";
$result = mysqli_query($con, $query);	
$i=0;

if ($result->num_rows > 0)
{
while($row = $result->fetch_assoc()) 
{
$pedidos[$i] = array(
   "id" => $row["id"],
   "titulo" => $row["titulo"],
   "pizza1" => $row["pizza1"],
   "qntsabores1" => $row["qntsabores1"],
   "sabor1" => $row["sabor1"],
   "bordaid1" => $row["bordaid1"],
   "pizza2" => $row["pizza2"],
   "qntsabores2" => $row["qntsabores2"],
   "sabor2" => $row["sabor2"],
   "bordaid2" => $row["bordaid2"],
   "valor" => $row["valor"],
   "bebidaid" => $row["bebidaid"],
   "data_pedido_criado" => $row["data_pedido_criado"],
   "data_pedido_aceito" => $row["data_pedido_aceito"],
   "data_pedido_pronto" => $row["data_pedido_pronto"],
   "data_pedido_entregue" => $row["data_pedido_entregue"],
   "status" => $row["status"],
   "observacao" => $row["observacao"],
   "token" => $row["token"]
);

$i++;
}
/*
$j = 0;

while ($j <= ($i -1)) {
foreach($pedidos[$j] as $chave => $valor){
    echo "{$chave} : {$valor}<br/>";
 }
$j++;
echo "<br>";
}
*/

//converte o conteúdo do array para uma string JSON
$json_str = json_encode($pedidos);

//imprime a string JSON
echo "$json_str";


}
else 
{
	echo json_encode("error");
}
  }
?>