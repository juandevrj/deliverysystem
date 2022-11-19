import { Component, OnInit, DoCheck } from '@angular/core';
import { ListService } from 'src/app/services/list.service';
import { HttpClient} from '@angular/common/http';
import { Carrinho, CarrinhoPromo } from 'src/app/carrinho';
import { Router } from '@angular/router';

 
declare var $: any;

/*Function JsFile*/
function selectQntSabor(){
  $('#sabor-select').dropdown();
}

function selectQntSabor2(){
  $('#sabor-select3').dropdown();
}

function bebidaSelect(){
  $('#bebida-select').dropdown();
}

function ShowListaSabores(){
  $("div.separ1").css("display" , "contents");
  var qnt = $('#sabor-select').val();
  $('#sabor-select2').dropdown({maxSelections: qnt});
}

function get_qntsabor(){
  return $('#sabor-select').val();
}

function ShowListaSabores2(){
  $("div.separ3").css("display" , "contents");
  var qnt = $('#sabor-select3').val();
  $('#sabor-select4').dropdown({maxSelections: qnt});
}

function ShowListaBordas(){
  $("div.separ2").css("display" , "contents");
  $('#borda-select').dropdown();
}

function ShowListaBordas2(){
  $("div.separ4").css("display" , "contents");
  $('#borda-select2').dropdown();
}

function getSaboresSel(){
return $('#sabor-select2').val();
}

function verificaSabores(Secpizza : number){
  if ($('#sabor-select2').val() != ''){
    if(Secpizza > 0){
      if ($('#sabor-select4').val() != ''){
        return true;
      }else return false;
    }else return true;
  }else return false;
  }

function getValue(id : string){
  if ($(id).val() == '') return 0; else return $(id).val();
}

function displayContents(id : string){
  $(id).css("display" , "contents");
}

@Component({
  selector: 'app-categoria0',
  templateUrl: './categoria0.component.html',
  styleUrls: ['../categoria/categoria.component.css']
})

export class Categoria0Component implements OnInit, DoCheck {

  constructor(private listService : ListService, private http: HttpClient,private router: Router) { }
  public escolheprod = this.listService.escolhido_id;
  public get_categoriaId = this.listService.categoria_id;
  public get_carrinho = this.listService.carrinho;
  public get_carrinhoPromo = this.listService.carrinhoPromo;
  postData_selected : any = this.listService.postData_selected;
  postData : any = this.listService.postData;
  saboresData : any = this.listService.saboresData;
  bordasData : any = this.listService.bordasData;
  bebidasData : any = this.listService.bebidasData;
  SaboresQnt : number = 0;
  secPizza : number = 0;
  bebidas : number = 0;
  msgError : string = '';
  

removerCarrinhoPromo(idProduto : number){
  var getcarrinhoPromo = this.listService.carrinhoPromo;
  var index = getcarrinhoPromo.findIndex( item  => item.id == idProduto );
  getcarrinhoPromo = getcarrinhoPromo.splice(index,1);
}

ArrayLength(array : any){
  return array.length(); 
}

counter(i: number) {
  return new Array(i);
}

callListaSabores(){
  ShowListaSabores();
}

callListaSabores2(){
  ShowListaSabores2();
}

get_QntSabor(){
  return get_qntsabor();
}

callBorda(){
  if(this.postData_selected[4] != 0){
  ShowListaBordas();
  }else{
  this.showPizza2()
  }
}

callBorda2(){
  if(this.postData_selected[7] != 0){
  ShowListaBordas2();
  }else{
    this.callBebidas();
  }
}

saborOUsabores (i: number){
  if (i <= 1){
    return "Sabor";
  }else{
    return "Sabores"
  }
}

getsaboressel(){
getSaboresSel();
}

showPizza2(){
  if(this.postData_selected[5] != 0){
 this.secPizza = 1;
  }else{
    this.callBebidas();
  }
}

callBebidas(){
  if(this.postData_selected[8] != 0){
 this.bebidas = 1;
  }else{
    this.finalizaProduto();
  }
}

finalizaProduto(){
  if (verificaSabores(this.secPizza)){
    this.msgError = '';
    displayContents('.disbtn');
  }else {
    this.msgError = 'Selecione o sabor da Pizza para continuar!';
}
}

verificaNovamente(){
  if(this.msgError)this.finalizaProduto();
}

getSabores(sabor : any):any{
  let arr : string[] = sabor;
  var sabores1 = '';
  var i : number = 1;
  
   for(var index in arr)
  { 
    sabores1 = sabores1 + "[ " + arr[index] + " ] ";
    i++;
  }

  return sabores1;
}

continuar(){
  if(this.msgError)this.finalizaProduto();
  else{


   var carrinhoA = new CarrinhoPromo(this.listService.categoria_id,this.listService.escolhido_nome,getValue('#sabor-select'),this.getSabores(getValue('#sabor-select2')),getValue('#borda-select'), getValue('#sabor-select3'),this.getSabores(getValue('#sabor-select4')),getValue('#borda-select2'),this.listService.postData_selected[1],this.listService.postData_selected[5],this.listService.postData_selected[2],getValue('#bebida-select') );

  
    this.listService.adicionarCarrinhoPromo(carrinhoA);
    this.router.navigate(['/carrinho']);
  }
}

ngOnInit(): void {
  if(this.postData_selected === undefined) this.router.navigate(['/cardapio']);


  this.escolheprod = this.listService.escolhido_id;
  this.get_categoriaId = this.listService.categoria_id;
  this.get_carrinho = this.listService.carrinho;
  this.get_carrinhoPromo = this.listService.carrinhoPromo;
  this.postData = this.listService.postData;
  this.postData_selected = this.listService.postData_selected;
  this.saboresData = this.listService.saboresData;
  this.bordasData = this.listService.bordasData;
  this.bebidasData = this.listService.bebidasData;
  this.SaboresQnt = 0;
  this.secPizza = 0;
  this.bebidas = 0;
  this.msgError = '';
}

ngDoCheck(): void {

  selectQntSabor();
  selectQntSabor2();
  bebidaSelect();
  this.verificaNovamente()
}

}
