import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { Categoria0Component } from './components/categoria0/categoria0.component';
import { Categoria1Component } from './components/categoria1/categoria1.component';
import { FinalizarComponent } from './components/finalizar/finalizar.component';
import { CashoutComponent } from './components/cashout/cashout.component';
import { PainelComponent } from './components/painel/painel.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'cardapio'},
  {path: 'cardapio', component: CardapioComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'carrinho', component: CarrinhoComponent},
  {path: 'categoria0', component: Categoria0Component},
  {path: 'categoria1', component: Categoria1Component},
  {path: 'finalizar', component: FinalizarComponent},
  {path: 'cashout', component: CashoutComponent},
  {path: 'painel', component: PainelComponent},
  {path: 'pedidos', component: PedidosComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);