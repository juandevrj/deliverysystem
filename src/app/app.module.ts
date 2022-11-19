import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CardapioComponent } from './components/cardapio/cardapio.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { Categoria0Component } from './components/categoria0/categoria0.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
// **************************************************
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { FinalizarComponent } from './components/finalizar/finalizar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CashoutComponent } from './components/cashout/cashout.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { Categoria1Component } from './components/categoria1/categoria1.component';
import { PainelComponent } from './components/painel/painel.component';

registerLocaleData(ptBr);
// **************************************************

@NgModule({
  declarations: [
    AppComponent,
    CardapioComponent,
    CategoriaComponent,
    HeaderComponent,
    Categoria0Component,
    CarrinhoComponent,
    FinalizarComponent,
    CashoutComponent,
    PedidosComponent,
    Categoria1Component,
    PainelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers:    [
    // ************************************
    { provide: LOCALE_ID, useValue: 'pt' },
    // ************************************
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
