import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/RtaApi.model';

class UsuarioMensaje{
  _id:string;
  usuario:string;
  clave:string;
  tipoUsuario:number;
  online:boolean;
  cantidadMensajes:number;

  constructor(usuario:Usuario,cantMensajes:number) {
    this._id = usuario._id;
    this.usuario = usuario.usuario;
    this.clave = usuario.clave;
    this.tipoUsuario = usuario.tipoUsuario;
    this.online = usuario.online;
    this.cantidadMensajes = cantMensajes;
  }
}

interface Mensaje{
  idRemitente:string;
  idReceptor:string;
  mensaje:string;
  fechaEnvio:string;
  esAdmin:boolean;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnChanges {

  @Input() usuario:Usuario;
  public usuarioMensaje:UsuarioMensaje;
  @ViewChild("boxMensajes", {static:false}) boxMensajes:ElementRef;
  public listaMensajes:Mensaje[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usuario.currentValue!=null) {
      this.inicializarUsuario(changes.usuario.currentValue);
    }
  }


  constructor() {

  }

  ngOnInit(): void {

  }

  inicializarUsuario(usuario:Usuario){
    this.usuarioMensaje = new UsuarioMensaje(usuario,100);
    this.cargarMensajes();
  }

  cargarMensajes(){

    this.moverScroll();
  }

  enviarNuevoMensaje(form:NgForm){
    this.listaMensajes.push({
      idRemitente:'Admin',
      idReceptor:this.usuario.usuario,
      mensaje:form.value.mensaje,
      fechaEnvio:new Date().toString(),
      esAdmin:true
    })
    this.moverScroll();
    form.reset();
  }

  moverScroll(){
    setTimeout(() => {
      this.boxMensajes.nativeElement.scrollTop = this.boxMensajes.nativeElement.scrollHeight;
    }, 100);

  }

}
