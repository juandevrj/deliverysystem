<?php

  // não deixe quebra de linha nos headers abaixo
 require ('include/config.inc.php');
 /*
  // não deixe quebra de linha nos headers abaixo
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
  header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
  header("Content-Type: application/json; charset=utf-8");
 
  // vamos obter os dados vindo do formulário
  // atenção: em um código real temos que validar
  $dados = file_get_contents("php://input");*/
  /* 
  // a requisição foi post?
  if(isset($dados) && !empty($dados)){
	//$request = json_decode($dados);
    //$idprod = $request->idprod;
	switch($dados) {
		case 'promocao':
		*/
$query = "SELECT * FROM promocao";
$result = mysqli_query($con, $query);	
$i=0;

if ($result->num_rows > 0)
{
while($row = $result->fetch_assoc()) 
{
$pedidos[$i] = array($row["id"],$row["titulo"],$row["valor"]);

$i++;
}
echo json_encode($pedidos);

}
		/*
		case 'pizzas':
		$array = array(
        1 => array(1,"Pizza Jumbona",120),
        2 => array(2,"Pizza Grande",100),
        3 => array(3,"Pizza Média",60)
        );
        $out = array_values($array);
        echo json_encode($out);
		break;
		
		case 'petiscos':
		$array = array(
        1 => array(1,"Batata Frita - Meia Porção",12),
        2 => array(2,"Batata Frita com Cheddar - Meia Porção",14),
        3 => array(3,"Batata Frita com Bacon - Meia Porção",16)
        );
        $out = array_values($array);
        echo json_encode($out);
		break;
		
		case 'sobremesas':
		$array = array(
        1 => array(1,"Bombom Ouro Branco Lacta",1),
        2 => array(2,"Paçoca",1),
        3 => array(3,"Halls Morango",2)
        );
        $out = array_values($array);
        echo json_encode($out);
		break;
		
		case 'bebidas':
		$array = array(
        1 => array(1,"Convenção 2L",5),
        2 => array(2,"Kuat 2L",5),
        3 => array(3,"Dolly 2L",5),
		4 => array(4,"Sprite 2L",8),
		5 => array(5,"Suco Del Valle 1L (pêssego)",8)
        );
        $out = array_values($array);
        echo json_encode($out);
		break;
		
		
	}
	}else{
				$array = array(
        1 => array("Pizza A","R$ 40,00"),
        2 => array("Pizza B","R$ 60,00"),
        3 => array("Pizza C","R$ 80,00")
        );
        $out = array_values($array);
        echo json_encode($out);
	}*/
?>

