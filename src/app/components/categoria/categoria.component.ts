import {Injectable} from '@angular/core';
import { Component, OnInit  } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { Carrinho, CarrinhoPromo } from 'src/app/carrinho';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit  {

  postData : any;


  constructor(private listService : ListService, private http: HttpClient,private router: Router) { }
  public get_categoriaId = this.listService.categoria_id;

  ler_produtos(){
    const headers = { 'content-type': 'application/json'} 
    this.http.post(this.listService.baseUrl,this.get_categoriaId,{headers})
    .subscribe(
      resultado => this.postData = resultado
  );
  }

  escolhe_prod(id : number, nome : string){
    this.listService.escolhido_id = id;
    this.listService.escolhido_nome = nome;

    if (this.get_categoriaId == 'promocao' || this.get_categoriaId == 'pizzas'){
    this.listService.select_promocao(id);
    this.router.navigate(['/categoria0']);
    }
    if (this.get_categoriaId == 'petiscos' || this.get_categoriaId == 'petiscos' || this.get_categoriaId == 'sobremesas' || this.get_categoriaId == 'bebidas'){
      this.listService.select_promocao(id);
      var carrinhoB = new Carrinho(this.listService.categoria_id,this.listService.escolhido_nome,this.listService.postData_selected[2]);
      this.listService.adicionarCarrinho(carrinhoB);
      
      this.router.navigate(['/carrinho']);
    }
    this.listService.ler_sabores();
    this.listService.ler_bordas();
    this.listService.ler_bebidas();
  }


  ngOnInit(): void {
    this.ler_produtos();
  }

}