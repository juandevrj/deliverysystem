import { Component, OnInit, DoCheck} from '@angular/core';
import { ListService } from 'src/app/services/list.service';

declare var $: any;

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})


export class CardapioComponent implements OnInit, DoCheck{

  constructor(private listService : ListService) { }


    status : any;
    funcionamento : boolean = true;

    public setCategoria(id : string){
    this.listService.postData_selected = undefined;
    this.listService.categoria_id = id;

    if(id == 'promocao') this.listService.ler_promocao();
    if(id == 'pizzas') this.listService.ler_pizzas();
    if(id == 'petiscos') this.listService.ler_petiscos();
    if(id == 'sobremesas') this.listService.ler_sobremesas();
    if(id == 'bebidas') this.listService.ler_bebidas2();

    
    this.listService.ler_sabores();
    this.listService.ler_bordas();
    this.listService.ler_bebidas();
  }

  ngOnInit(): void {
   $('#status-servico').hide();
   $('#status-servico2').hide();
    this.listService.statusServico();
    this.listService.postData_selected = undefined;
  }

  ngDoCheck(): void {
    this.status = this.listService.servicoStatus;
   
    if(this.status != undefined){
      if(this.status[0] == 0){
       $('#status-servico').show();
        this.funcionamento = false;
      }else {
        $('#status-servico2').show();
        this.funcionamento = true;
      }

  }
  


  }

}

