import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  constructor(private listService : ListService, private router: Router) { }

  i : boolean = false;

  ngOnInit(): void {
  }

  carrinhoLength(){
    return this.listService.carrinhoPromo.length + this.listService.carrinho.length;
  }

  ngDoCheck(): void {
    if (this.router.url === '/cardapio' || this.router.url === '/categoria') this.i = true; else this.i = false;
  }
}
