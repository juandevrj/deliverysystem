import { Component, OnInit, DoCheck } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { HttpClient} from '@angular/common/http';
import { Carrinho, CarrinhoPromo } from 'src/app/carrinho';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria1',
  templateUrl: './categoria1.component.html',
  styleUrls: ['../categoria/categoria.component.css']
})
export class Categoria1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
