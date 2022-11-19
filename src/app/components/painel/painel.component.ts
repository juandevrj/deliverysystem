import { Component, OnInit, DoCheck } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ListService, userLogin } from 'src/app/services/list.service';
import { FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

declare var $: any;

/*Function JsFile*/
function jsFunc(){
  $('table').tablesort();

  $('form').submit(false);

  $('.ui.form').form({
    fields: {
      username: {
        identifier  : 'username',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe o Usuário'
          }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [
          {
            type   : 'empty',
            prompt : 'Informe a Senha'
          }
        ]
      },
    }

  })
}

function errologin(){
  $('.ui.error.message').addClass('erromsg');
  $('.ui.error.message').html('Senha ou Usuário incorreto!');
  
}

function rmvErro(){
  $('.ui.error.message').removeClass('erromsg');
  $('.ui.error.message').html('');
}

function showModal(i : number){
  $('#'+i)
  .modal('show')
  .modal({ useFlex: 'auto'})
;
$('#pagamento').dropdown();
}

function refresh(): void {
  window.location.reload();
}


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['../categoria/categoria.component.css']
})
export class PainelComponent implements OnInit, DoCheck {
  formCliente!: FormGroup;
  constructor(private cookieService: CookieService, private listService : ListService, private formBuilder: FormBuilder,private http: HttpClient,private router: Router) { }
  
  Auth : boolean = false;
  PedidosLista : any;
  Pedido : any;
  clientedados : any;
  status : any;
  modalActive : boolean = false;
  beep : boolean = false;
  statusServico : any;
  classStatus : string = 'on';
  OnOff : string = 'ABERTO';
  rtnStatus : any;

  

  ngOnInit(): void {

    this.listService.statusServico();

    if(this.cookieService.get('Auth') == 'true'){
      this.Auth = true;
      this.lerPedidoLista();
      this.lerPedido();
      this.lerClienteDados();
    }
  
    jsFunc();
    this.createForm(new userLogin());

    
    interval(7000).subscribe(x => {
      if(this.modalActive == false){
      this.atualizapg();
      if(this.beep == true){
      this.listService.callBeep();
      console.log('beepou');
      this.beep = false;
      }
    }
  });
 
  }

  verStatus(){

  if(this.statusServico[0] == 0){
    this.OnOff = 'FECHADO';
    this.classStatus = 'off';
  }else{
    this.OnOff = 'ABERTO';
    this.classStatus = 'on';
  }

  
  }

  changeStatus(){
    var getDescricao = $('#txtdescricao').val();
    var getStatus = $('#servicestatus').is(":checked");
    if (getStatus == true) getStatus = 1; else getStatus = 0;
      const dados = {status: getStatus, descricao : getDescricao}
      const headers = { 'content-type': 'application/json'} 
  
      this.http.post(this.listService.baseUrl + 'pedidos/funcionamento.php',dados,{headers})
      .subscribe(
        resultado => this.rtnStatus = resultado
    );


  }

  ngDoCheck(): void {
    //$('table').tablesort();
    this.statusServico = this.listService.servicoStatus;
    this.verStatus();

}

  onSubmit(){
    if(this.formCliente.value.username && this.formCliente.value.password){
      if(this.formCliente.value.username == 'admin' && this.formCliente.value.password == 'juan'){
         this.cookieService.set('Auth','true');
         this.Auth = true;
         this.lerPedidoLista();
         this.lerPedido();
         this.lerClienteDados();

  }else{
    errologin();
  }
  }
  }

  showModal(i : number){
    if(i == 18112022){
    if(this.statusServico[0] == 0){
      $('#servicestatus').prop( "checked", false );
    }else{
      $('#servicestatus').prop( "checked", true );
    }
  }

    this.modalActive = true;
    showModal(i);

    $('#'+i).modal({
      onHidden: function () {
        refresh();
      }
    })
  }

  rmvErro(){
    rmvErro();
  }


  /* LISTA DE FUNÇÕES */
  createForm(userlogin: userLogin) {
    this.formCliente = new FormGroup({
      username: new FormControl(userlogin.username),
      password: new FormControl(userlogin.password)
    })
  }


  lerPedidoLista(){
    const headers = { 'content-type': 'application/json'} 

    this.http.post(this.listService.baseUrl + 'pedidos/listaPainel.php','1',{headers})
    .subscribe(
      resultado => this.PedidosLista = resultado
  );
  }

  lerPedido(){
    const headers = { 'content-type': 'application/json'} 

    this.http.post(this.listService.baseUrl + 'pedidos/pedidoPainel.php','1',{headers})
    .subscribe(
      resultado => this.Pedido = resultado
  );
  }

  lerClienteDados(){
    const headers = { 'content-type': 'application/json'} 

    this.http.post(this.listService.baseUrl + 'pedidos/clientes.php','1',{headers})
    .subscribe(
      resultado => this.clientedados = resultado
  );
  }

  getclassinfo(s : string){
     if(s == "Aguardando Aprovação"){
      this.beep = true;
    return "positive";
     }else if(s == "Pedido Entregue"){
    return "disabled";
     }else if(s == "Pedido em Preparação"){
      return "negative";
   }else if(s == "Saiu para Entrega"){
    return "blue";
   }else if(s == "Pedido Cancelado"){
      return "negative";
   }
  }



  getSelId(id : string, i : number){
    var status = $('#'+id).val();
    if(status){
    
      const dados = { 'id' : id, 'status' : status }
      const headers = { 'content-type': 'application/json'} 
      this.http.post(this.listService.baseUrl + 'pedidos/setstatus.php',dados,{headers})
      .subscribe(
        resultado => this.status = resultado
    );
    refresh();
    $('#'+i).modal('hide');
    
  }
  }

  saborOUsabores (i: number){
    if (i < 2){
      return "Sabor";
    }else{
      return "Sabores"
    }
  }

 subtotal(id : number){
  
  var i : number = 0;
  for(let repo of this.Pedido){
  if (repo.id == id){
  i = i + repo.valor;
  }
 }
 return i;
}

callLogout(){
  this.Auth=false;
  this.cookieService.delete('Auth');
}

atualizapg(){
  
  this.lerPedidoLista();
  this.lerPedido();
  this.lerClienteDados();
}

pedidosempty(){
  if(this.lerPedidoLista == undefined)return "Não há pedidos ativos no momento!";
}

}
