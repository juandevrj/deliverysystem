import { Component, OnInit, DoCheck, } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ListService } from 'src/app/services/list.service';
import { Carrinho, CarrinhoPromo } from 'src/app/carrinho';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['../categoria/categoria.component.css']
})
export class CarrinhoComponent implements OnInit, DoCheck {

  constructor(private listService : ListService, private http: HttpClient,private router: Router) { }
  public get_carrinhoPromo = this.listService.carrinhoPromo;
  public get_carrinho = this.listService.carrinho;


  removerCarrinhoPromo(idProduto : number){
    var getcarrinhoPromo = this.listService.carrinhoPromo;
    var index = getcarrinhoPromo.findIndex( item  => item.id == idProduto );
    getcarrinhoPromo = getcarrinhoPromo.splice(index,1);
  }

  removerCarrinho(idProduto : number){
    var getcarrinho = this.listService.carrinho;
    var index = getcarrinho.findIndex( item  => item.id == idProduto );
    getcarrinho = getcarrinho.splice(index,1);
  }

  copiaCarrinho(idProduto : number){
    var getcarrinho = this.listService.carrinho;
    var index = getcarrinho.findIndex( item  => item.id == idProduto );

    var lastId = getcarrinho.at(-1);
    if(lastId?.id == undefined){
    var setid : number = 1;
    }else{
    var setid : number = lastId?.id;
    setid = setid + 1;
    }

    const dados = {
      id : setid,
      tipo : getcarrinho[index].tipo,
      prodID : getcarrinho[index].prodID,
      Valor : getcarrinho[index].Valor
    }
    this.listService.carrinho.push(dados);
  }

  copiaCarrinhoPromo(idProduto : number){
    var getcarrinhoPromo = this.listService.carrinhoPromo;
    var index = getcarrinhoPromo.findIndex( item  => item.id == idProduto );

    var lastId = getcarrinhoPromo.at(-1);
    if(lastId?.id == undefined){
    var setid : number = 1;
    }else{
    var setid : number = lastId?.id;
    setid = setid + 1;
    }

    const dados = {
      id : setid,
      tipo : getcarrinhoPromo[index].tipo,
      prodID : getcarrinhoPromo[index].prodID,
      Sabor1 : getcarrinhoPromo[index].Sabor1,
      qntSabores1 : getcarrinhoPromo[index].qntSabores1,
      bordaID1 : getcarrinhoPromo[index].bordaID1,
      Sabor2 : getcarrinhoPromo[index].Sabor2,
      qntSabores2 : getcarrinhoPromo[index].qntSabores2,
      bordaID2 : getcarrinhoPromo[index].bordaID2,
      BebidaID : getcarrinhoPromo[index].BebidaID,
      Pizza1 : getcarrinhoPromo[index].Pizza1,
      Pizza2 : getcarrinhoPromo[index].Pizza2,
      Valor : getcarrinhoPromo[index].Valor
    }
    this.listService.carrinhoPromo.push(dados);
  }

  saborOUsabores (i: number){
    if (i <= 1){
      return "Sabor";
    }else{
      return "Sabores"
    }
  }

  subtotal1(){
    return this.listService.subtotal1();
  }
  

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    }

}
