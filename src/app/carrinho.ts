export class Carrinho {
    tipo: string = ''; //tipo do produto (promocao/pizza/sobremesa/bebidas)
    prodID: string = ''; //nome do produto (para ser buscado na DB)
    Valor : number = 0;
    id: number = 0;
     
    constructor(tipo: string, prodID: string, Valor : number, id?: number) {
      this.tipo = tipo;
      this.prodID = prodID;
      this.Valor = Valor;
     // this.id = id;
    }
}

export class CarrinhoPromo {
  tipo: string = ''; //tipo do produto (promocao/pizza/sobremesa/bebidas)
  prodID: string = ''; //nome do produto (para ser buscado na DB)
  qntSabores1: number = 0;
  Sabor1 : string = '';
  bordaID1 : number = 0;
  qntSabores2: number = 0;
  Sabor2 : string = '';
  bordaID2 : number = 0;
  BebidaID : number = 0;
  Pizza1 : string = '';
  Pizza2 : string = '';
  Valor : number = 0;

  id: number = 0;
   
  constructor(tipo: string, prodID: string, qntSabores1: number, Sabor1 : string, bordaID1 : number,qntSabores2: number, Sabor2 : string, bordaID2 : number, Pizza1 : string, Pizza2 : string,Valor : number, BebidaID : number, id?: number) {
    this.tipo = tipo;
    this.prodID = prodID;
    this.qntSabores1 = qntSabores1;
    this.bordaID1 = bordaID1;
    this.Sabor1 = Sabor1;
    this.qntSabores2 = qntSabores2;
    this.bordaID2 = bordaID2;
    this.Sabor2 = Sabor2;
    this.BebidaID = BebidaID;
    this.Pizza1 = Pizza1;
    this.Pizza2 = Pizza2;
    this.Valor = Valor;
  }
}

/*

<input type="text" class="ui text" id="juan"> 
<input type="button" class="ui button" value="Add Carrinho" (click)="getText()">
<table class='ui table'>
  <tbody>
    <tr *ngFor="let repo of get_carrinho;">
      <td>{{repo.id}}</td>
      <td>{{repo.bordaID}}</td>
      <td>{{repo.prodID}}</td>
      <td>{{repo.qntSabores}}</td>
      <td>{{repo.tipo}}</td>
      <td><input type="button" class="ui button" value="Remover" (click)="removerCarrinho(repo.id);"></td>
    </tr>
  </tbody>
</table> 

*/