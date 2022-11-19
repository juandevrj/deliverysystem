import { Component, DoCheck, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { dadosPessoais } from 'src/app/services/list.service';
import { Router } from '@angular/router';
import { ListService } from 'src/app/services/list.service';

declare var $: any;

/*Function JsFile*/
function jsFunc(){

  $('.ui.form').form({
    fields: {
      nome: {
        identifier  : 'nome',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe seu Nome'
          }
        ]
      },
      sobrenome: {
        identifier  : 'sobrenome',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe seu Sobrenome'
          }
        ]
      },
      celular: {
        identifier  : 'celular',
        rules: [
          {
            type   : 'number', 
            prompt : 'Informe apenas números'
          },
          {
            type   : 'minLength[10]', 
            prompt : 'Informe um número de Celular válido'
          },
          {
            type   : 'maxLength[11]', 
            prompt : 'Informe um número de Celular válido'
          },
        ]
      },
      bairro: {
        identifier  : 'bairro',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe seu bairro (entregamos apenas nos bairros listados)'
          }
        ]
      },
      endereco: {
        identifier  : 'endereco',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe o nome da rua da sua Residência'
          }
        ]
      },
      endereco2: {
        identifier  : 'endereco2',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe o número da sua Residência'
          }
        ]
      },
      referencia: {
        identifier  : 'referencia',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe um ponto de referência'
          }
        ]
      },
      pagamento: {
        identifier  : 'pagamento',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe uma forma de pagamento'
          }
        ]
      },

    },
    onSuccess:function(){
    $('#status').val('1');
   },
   onFailure:function(){
    $('#status').val('0');
 }

  })
}

function getStatus(){
  return $('#status').val();
}

function loadDropMenu(){
  $('#pagamento').dropdown();
  $('#bairro').dropdown();
  $('#state').dropdown();
  $('#city').dropdown();
}


@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['../categoria/categoria.component.css']
})
export class FinalizarComponent implements OnInit, DoCheck {

  formCliente!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private listService : ListService) { }
 

  jsFunc(){
    jsFunc();
  }

  onSubmit(){
  }

  ngOnInit(): void {
    if(this.listService.carrinho.length <= 0 && this.listService.carrinhoPromo.length <= 0) this.router.navigate(['/carrinho']);
    jsFunc();
    loadDropMenu();
    this.createForm(new dadosPessoais());
  }

  ngDoCheck(): void {
    if (getStatus() == "1"){
      this.listService.dadospessoais.nome = this.formCliente.value.nome;
      this.listService.dadospessoais.sobrenome = this.formCliente.value.sobrenome;
      this.listService.dadospessoais.celular = this.formCliente.value.celular;
      this.listService.dadospessoais.bairro = this.formCliente.value.bairro;
      this.listService.dadospessoais.endereco = this.formCliente.value.endereco;
      this.listService.dadospessoais.endereco2 = this.formCliente.value.endereco2;
      this.listService.dadospessoais.complemento = this.formCliente.value.complemento;
      this.listService.dadospessoais.referencia = this.formCliente.value.referencia;
      this.listService.dadospessoais.pagamento = this.formCliente.value.pagamento;
      this.listService.dadospessoais.observacao = this.formCliente.value.observacao;
      console.log( this.listService.dadospessoais);
      this.router.navigate(['/cashout']);
    }
  }

  createForm(dadospessoais: dadosPessoais) {
    this.formCliente = new FormGroup({
      nome: new FormControl(dadospessoais.nome),
      sobrenome: new FormControl(dadospessoais.sobrenome),
      celular: new FormControl(dadospessoais.celular),
      bairro: new FormControl(dadospessoais.bairro),
      endereco: new FormControl(dadospessoais.endereco),
      endereco2: new FormControl(dadospessoais.endereco2),
      complemento: new FormControl(dadospessoais.complemento),
      referencia: new FormControl(dadospessoais.referencia),
      pagamento: new FormControl(dadospessoais.pagamento),
      observacao: new FormControl(dadospessoais.observacao)
    })
  }
  

}
