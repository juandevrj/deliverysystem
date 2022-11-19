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
	  
if($dados == 1){

//verifica se existe pedidos do cliente (token)
$query = "SELECT * FROM funcionamento WHERE id = '1'";
$result = mysqli_query($con, $query);	
$i=0;

if ($result->num_rows > 0)
{
while($row = $result->fetch_assoc()) 
{
$funcionamento = array($row["status"],$row["descricao"]);

$i++;
}


//converte o conteúdo do array para uma string JSON
$json_str = json_encode($funcionamento);

//imprime a string JSON
echo "$json_str";

}
}else{
	
$jsonIterator = json_decode($dados, TRUE);

//verifica se existe pedidos do cliente (token)
$query = "UPDATE funcionamento SET status='".$jsonIterator['status']."', descricao='".$jsonIterator['descricao']."'";
$result = mysqli_query($con, $query);
echo json_encode(1);


}

 }
  
  
  
?>



