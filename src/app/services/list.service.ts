import { Injectable } from '@angular/core';
import { Carrinho, CarrinhoPromo } from 'src/app/carrinho';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

export class dadosPessoais {
  nome: string = '';
  sobrenome: string = '';
  celular!: number;
  bairro: string = '';
  endereco: string = '';
  endereco2: string = '';
  complemento: string = '';
  referencia: string = '';
  pagamento: string = '';
  observacao: string = '';
}

export class userLogin {
  username : string = '';
  password : string = '';
}

function playaudio(){
  var audio = new Audio('../../../assets/images/beep.mp3');
  audio.play();
}

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient,private router: Router) { }

  public categoria_id : string = 'promocao';
  public escolhido_id : number = 0;
  public escolhido_nome : string = '';
  public carrinho : Carrinho[] = [];
  public carrinhoPromo : CarrinhoPromo[] = [];
  public postData: any;
  public postData_selected: any;
  public Token : any;
  public Pedidos : any;
  public clienteDados : any;
  public PedidosLista : any;
  public PedidoEnviado : boolean = false;
  public servicoStatus : any;
  saboresData : any;
  bordasData : any;
  bebidasData : any;

  public dadospessoais = new dadosPessoais;


    // url base do endereço do serviço remoto
    public baseUrl : string = "https://" + window.location.hostname + "/php/";

    callBeep(){
      playaudio();
    }

    adicionarCarrinho(produto: Carrinho){
      var lastId = this.carrinho.at(-1);
      if(lastId?.id == undefined){
      var setid : number = 1;
      }else{
      var setid : number = lastId?.id;
      setid = setid + 1;
      }

      const dados = {
        id : setid,
        tipo : produto.tipo,
        prodID : produto.prodID,
        Valor : produto.Valor
      }
      this.carrinho.push(dados);
    }

    adicionarCarrinhoPromo(produto: CarrinhoPromo){
      var lastId = this.carrinhoPromo.at(-1);
      if(lastId?.id == undefined){
      var setid : number = 1;
      }else{
      var setid : number = lastId?.id;
      setid = setid + 1;
      }

      const dados = {
        id : setid,
        tipo : produto.tipo,
        prodID : produto.prodID,
        Sabor1 : produto.Sabor1,
        qntSabores1 : produto.qntSabores1,
        bordaID1 : produto.bordaID1,
        Sabor2 : produto.Sabor2,
        qntSabores2 : produto.qntSabores2,
        bordaID2 : produto.bordaID2,
        BebidaID : produto.BebidaID,
        Pizza1 : produto.Pizza1,
        Pizza2 : produto.Pizza2,
        Valor : produto.Valor
      }
      this.carrinhoPromo.push(dados);
    }

    enviaPedido(){
      const headers = { 'content-type': 'application/json'} 

     const dados = {
      carrinhoPromo : this.carrinhoPromo,
      carrinho : this.carrinho,
      dadospessoais : this.dadospessoais
     }

      this.http.post(this.baseUrl + 'cashout/index.php',dados,{headers})
      .subscribe(
        resultado => this.Token = resultado
    );
    }


    lerPedidoLista(token : any){
      const headers = { 'content-type': 'application/json'} 

      this.http.post(this.baseUrl + 'pedidos/lista.php',token,{headers})
      .subscribe(
        resultado => this.PedidosLista = resultado
    );
    }

    lerClienteDados(token : any){
      const headers = { 'content-type': 'application/json'} 

      this.http.post(this.baseUrl + 'pedidos/index2.php',token,{headers})
      .subscribe(
        resultado => this.clienteDados = resultado
    );
    }

    lerPedido(token : any){
      const headers = { 'content-type': 'application/json'} 

      this.http.post(this.baseUrl + 'pedidos/index.php',token,{headers})
      .subscribe(
        resultado => this.Pedidos = resultado
    );
    }

    statusServico(){
      const headers = { 'content-type': 'application/json'} 

      this.http.post(this.baseUrl + 'pedidos/funcionamento.php','1',{headers})
      .subscribe(
        resultado => this.servicoStatus = resultado
    );
    }


ler_promocao(){
      const headers = { 'content-type': 'application/json'} 
      this.http.post(this.baseUrl + 'promocao/index.php','1',{headers})
      .subscribe(
        resultado => this.postData = resultado
    );
  }

ler_pizzas(){
    const headers = { 'content-type': 'application/json'} 
    this.http.post(this.baseUrl + 'pizzas/index.php','1',{headers})
    .subscribe(
      resultado => this.postData = resultado
  );
}

ler_petiscos(){
  const headers = { 'content-type': 'application/json'} 
  this.http.post(this.baseUrl + 'petiscos/index.php','1',{headers})
  .subscribe(
    resultado => this.postData = resultado
);
}

ler_sobremesas(){
  const headers = { 'content-type': 'application/json'} 
  this.http.post(this.baseUrl + 'sobremesas/index.php','1',{headers})
  .subscribe(
    resultado => this.postData = resultado
);
}

ler_bebidas2(){
  const headers = { 'content-type': 'application/json'} 
  this.http.post(this.baseUrl + 'bebidas/index.php','bebidas',{headers})
  .subscribe(
    resultado => this.postData = resultado
);
}

  select_promocao(id : number):any{
    const found = this.postData.find((element: number[]) => element[0] === id);
    this.postData_selected = found;
  }



  ler_sabores(): void{
    const headers = { 'content-type': 'application/json'} 
    this.http.post(this.baseUrl + 'sabores/index.php','sabores',{headers})
    .subscribe(
      resultado => this.saboresData = resultado
  );
  }

  ler_bordas(){
    const headers = { 'content-type': 'application/json'} 
    this.http.post(this.baseUrl + 'bordas/index.php','bordas',{headers})
    .subscribe(
      resultado => this.bordasData = resultado
  );
  }
  
  ler_bebidas(){
    const headers = { 'content-type': 'application/json'} 
    this.http.post(this.baseUrl + 'bebidas/index.php','bebidas',{headers})
    .subscribe(
      resultado => this.bebidasData = resultado
  );
  }

  subtotal1(){
    var i : number = 0;
    if(this.carrinhoPromo.length > 0){
       for(let repo of this.carrinhoPromo){
          i = i + repo.Valor;
       }
       //return i;
    }
    if(this.carrinho.length > 0){
      for(let repo of this.carrinho){
         i = i + repo.Valor;
      }
      //return i;
   }
   return i;
  }

  subtotal2(n : number){
    if(this.carrinhoPromo.length > 0){
      var i : number = 0;
       for(let repo of this.carrinhoPromo){
          i = i + repo.Valor;
       }
       return i + n;
    }
  }

  }