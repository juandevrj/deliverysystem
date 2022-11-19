import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cashout',
  templateUrl: './cashout.component.html',
  styleUrls: ['../categoria/categoria.component.css']
})
export class CashoutComponent implements OnInit {

  constructor(private listService : ListService, private router: Router) { }

  public get_carrinhoPromo = this.listService.carrinhoPromo;
  public get_carrinho = this.listService.carrinho;
  public get_dadosEntrega = this.listService.dadospessoais;


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

  subtotal2(n : number){
    return this.listService.subtotal2(n);
  }

  observacao (s : string){
    if(s == '') return "Sem Observações"; else return s;
  }

  enviaPedido(){
    this.listService.enviaPedido();
    this.listService.PedidoEnviado = true;
    this.router.navigate(['/pedidos']);
  }


  ngOnInit(): void {

    if (this.get_carrinhoPromo.length === 0 && this.get_carrinho.length === 0 && this.get_dadosEntrega.nome == ''){
      this.router.navigate(['/carrinho']);
    }
  }

  
}
