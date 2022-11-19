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
	  
$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($dados, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

foreach ($jsonIterator as $key => $val) {
    if(!is_array($val)) {
	   	switch (true) {
			
			case $key == "tipo" :
			     $tipo[] = $val;
			     break;
				 
			case $key == "prodID" :
			     $titulo[] = $val;
			     break;			

			case $key == "qntSabores1" :
			     $qntsabores1[] = $val;
			     break;			

			case $key == "Sabor1" :
			     $Sabor1[] = $val;
			     break;					 

			case $key == "bordaID1" :
			     $bordaID1[] = $val;
			     break;		

			case $key == "Sabor2" :
			     $Sabor2[] = $val;
			     break;	

			case $key == "qntSabores2" :
			     $qntSabores2[] = $val;
			     break;		

			case $key == "bordaID2" :
			     $bordaID2[] = $val;
			     break;	

			case $key == "BebidaID" :
			     $BebidaID[] = $val;
			     break;	

			case $key == "Pizza1" :
			     $Pizza1[] = $val;
			     break;		

			case $key == "Pizza2" :
			     $Pizza2[] = $val;
			     break;	

			case $key == "Valor" :
			     $Valor[] = $val;
			     break;	

			case $key == "nome" :
			     $nome = $val;
			     break;		

			case $key == "sobrenome" :
			     $sobrenome = $val;
			     break;		

			case $key == "bairro" :
			     $bairro = $val;
			     break;		

			case $key == "endereco" :
			     $endereco = $val;
			     break;	

			case $key == "endereco2" :
			     $endereco2 = $val;
			     break;		

			case $key == "complemento" :
			     $complemento = $val;
			     break;		

			case $key == "referencia" :
			     $referencia = $val;
			     break;		

			case $key == "pagamento" :
			     $pagamento = $val;
			     break;		

			case $key == "observacao" :
			     $observacao = $val;
			     break;		

			case $key == "celular" :
			     $celular = $val;
			     break;					 		
		}

        //echo "$key : $val<br/>";
    }
}

//gera token com numero do celular
$token = md5($celular);

//Pega data/hora agora
$timezone = new DateTimeZone('America/Sao_Paulo');
$agora = new DateTime('now', $timezone);
$data_agora = $agora->format('d/m/Y H:i');

$sequencia = file_get_contents("num.txt");
$file = fopen("num.txt","w");
fwrite($file,($sequencia + 1));
fclose($file);

$i=0;
while ($i < count($tipo)) {
if ($tipo[$i] ?? null) $qtipo = $tipo[$i]; else $qtipo = null;
if ($titulo[$i] ?? null)$qtitulo = $titulo[$i]; else $qtitulo = null;
if ($Pizza1[$i] ?? null) $qPizza1 = $Pizza1[$i]; else $qPizza1 = null;
if ($qntsabores1[$i] ?? null) $qqntsabores1 = $qntsabores1[$i]; else $qqntsabores1 = null;
if ($Sabor1[$i] ?? null) $qSabor1 = $Sabor1[$i]; else $qSabor1 = null;
if ($bordaID1[$i] ?? null) $qbordaID1 = $bordaID1[$i]; else $qbordaID1 = null;
if ($Pizza2[$i] ?? null) $qPizza2 = $Pizza2[$i]; else $qPizza2 = null;
if ($qntSabores2[$i] ?? null) $qqntSabores2 = $qntSabores2[$i]; else $qqntSabores2 = null;
if ($Sabor2[$i] ?? null) $qSabor2 = $Sabor2[$i]; else $qSabor2 = null;
if ($bordaID2[$i] ?? null) $qbordaID2 = $bordaID2[$i]; else $qbordaID2 = null;
if ($BebidaID[$i] ?? null) $qBebidaID = $BebidaID[$i]; else $qBebidaID = null;
if ($Valor[$i] ?? null) $qValor = $Valor[$i]; else $qValor = null;
$i++;

$query_pedido[] = "INSERT INTO `pedidos`(`id`,`token`, `tipo`, `titulo`, `pizza1`, `qntsabores1`, `sabor1`, `bordaid1`, `pizza2`, `qntsabores2`, `sabor2`, `bordaid2`, `bebidaid`, `valor`, `data_pedido_criado`, `data_pedido_aceito`, `data_pedido_pronto`, `data_pedido_entregue`, `status`, `observacao`) VALUES 
                                      ('$sequencia','$token','$qtipo','$qtitulo','$qPizza1','$qqntsabores1','$qSabor1','$qbordaID1','$qPizza2','$qqntSabores2','$qSabor2','$qbordaID2','$qBebidaID','$qValor','$data_agora','','','','Aguardando Aprovação','$observacao')";
}
//verifica se o cliente já existe no banco de dados
$query = "SELECT token FROM clientes WHERE token = '$token'";

$result = mysqli_query($con, $query);
if (mysqli_num_rows($result) > 0){

// Cadastra pedido
foreach($query_pedido as $element){
	mysqli_query($con, $element);
}

}else{
// Insere novo usuário
$query = "INSERT INTO `clientes`(`token`, `nome`, `sobrenome`, `bairro`, `rua`, `numero`, `complemento`, `referencia`, `pagamento`, `observacao`, `celular`) 
VALUES ('$token','$nome','$sobrenome','$bairro','$endereco','$endereco2','$complemento','$referencia','$pagamento','$observacao','$celular')";
mysqli_query($con, $query);

// Cadastra pedido
foreach($query_pedido as $element){
	mysqli_query($con, $element);
}
}
echo json_encode($token);
  }
?>

