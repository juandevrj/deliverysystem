import { Component, DoCheck, OnInit, AfterViewChecked } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { Router, ActivatedRoute  } from '@angular/router';
import { interval } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
declare var $: any;

function accordion(){
  $('.ui.styled.fluid.accordion').accordion();
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['../categoria/categoria.component.css']
})

export class PedidosComponent implements OnInit, DoCheck, AfterViewChecked {

  constructor(private listService : ListService, private router: Router, private route: ActivatedRoute, private cookieService: CookieService) { }
  
  ngAfterViewChecked(): void {
    accordion();
  }

  num : boolean = false;
  token!: string;
  pedidosLista! : any;
  pedidos! : any;
  clientedados! : any;
  pedidoselect : boolean = true;

  saborOUsabores (i: number){
    if (i < 2){
      return "Sabor";
    }else{
      return "Sabores"
    }
  }

  setSelect(n : number){
      if(n == 0) this.pedidoselect = true; else this.pedidoselect = false;
  }

  atualizapg(){
    if (this.pedidoselect == true){
    this.listService.lerPedidoLista(this.token);
    this.listService.lerPedido(this.token);
    this.listService.lerClienteDados(this.token);
  }
  }


  ngOnInit(): void {

    if(this.listService.PedidoEnviado == false && this.cookieService.get('token')){
      this.num = true;
      this.listService.Token = this.cookieService.get('token');
      this.token = this.cookieService.get('token');
      this.listService.lerPedidoLista(this.cookieService.get('token'));
      this.listService.lerPedido(this.cookieService.get('token'));
      this.listService.lerClienteDados(this.cookieService.get('token'));
    }

    interval(10000).subscribe(x => {
      this.atualizapg();
  });

  
  }



    ngDoCheck(): void {
    
    this.pedidosLista = this.listService.PedidosLista;
    this.pedidos = this.listService.Pedidos;
    this.clientedados = this.listService.clienteDados;
    //accordion();

      if(this.listService.Token != undefined && this.num == false){
        this.num = true;
        this.token = this.listService.Token;
        this.cookieService.delete('token');
        this.cookieService.set('token',this.listService.Token);
        this.listService.lerPedidoLista(this.listService.Token);
        this.listService.lerPedido(this.listService.Token);
        this.listService.lerClienteDados(this.listService.Token);
      }
    }
  
  




}

