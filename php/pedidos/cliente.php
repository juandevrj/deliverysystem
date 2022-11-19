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
$query = "SELECT * FROM clientes WHERE token = '$dados' LIMIT 1";
$result = mysqli_query($con, $query);	
$i=0;

if ($result->num_rows > 0)
{
while($row = $result->fetch_assoc()) 
{
$pedidos = array(
   "nome" => $row["nome"],
   "sobrenome" => $row["sobrenome"],
   "bairro" => $row["bairro"],
   "rua" => $row["rua"],
   "numero" => $row["numero"],
   "complemento" => $row["complemento"],
   "referencia" => $row["referencia"],
   "pagamento" => $row["pagamento"],
   "observacao" => $row["observacao"],
   "celular" => $row["celular"]
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