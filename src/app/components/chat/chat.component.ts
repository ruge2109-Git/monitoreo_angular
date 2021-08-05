import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/RtaApi.model';
import { MensajeChat } from 'src/app/models/socket.model';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

class UsuarioMensaje{
  _id:string;
  usuario:string;
  clave:string;
  tipoUsuario:number;
  online:boolean;
  cantidadMensajes:number;

  constructor(usuario:Usuario,cantMensajes:number) {
    this._id = usuario.id;
    this.usuario = usuario.usuario;
    this.clave = usuario.clave;
    this.tipoUsuario = usuario.tipoUsuario;
    this.online = usuario.online;
    this.cantidadMensajes = cantMensajes;
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnChanges,OnDestroy {

  @Input() usuario:Usuario;
  public usuarioMensaje:UsuarioMensaje;
  @ViewChild("boxMensajes", {static:false}) boxMensajes:ElementRef;
  public listaMensajes:MensajeChat[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.usuario.currentValue!=null) {
      this.inicializarUsuario(changes.usuario.currentValue);
      this.obtenerMensajes();
    }
  }


  constructor(
    private _loginService:LoginService,
    private _usuarioService:UsuarioService
    ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // this._usuarioService.eliminarListeners();
  }

  obtenerMensajes(){
    this._usuarioService.obtenerTodosLosMensajesSocket().subscribe((data)=>{
      console.log(data);

      if (data.flag) {
        data.data.forEach(element => {
          this.nuevoMensaje(element);
        });
      }
    })
  }

  inicializarUsuario(usuario:Usuario){
    this.usuarioMensaje = new UsuarioMensaje(usuario,100);
    this.cargarMensajes();
  }

  cargarMensajes(){
    const mensajeChat={
      idRemitente: this._loginService.obtenerUsuarioLogueado().id,
      idReceptor: this.usuario.id
    }
    this._usuarioService.obtenerTodosLosMensajesSocketPrimeraVez(mensajeChat);
    this.moverScroll();
  }

  nuevoMensaje(mensaje:MensajeChat){

    if (mensaje.idRemitente == this._loginService.obtenerUsuarioLogueado().id) {
      mensaje.esAdmin = true;
    }

    this.listaMensajes.push(mensaje);
    this.moverScroll();
  }

  enviarNuevoMensaje(form:NgForm){
    const nuevoMensaje:MensajeChat = {
      idRemitente: this._loginService.obtenerUsuarioLogueado().id,
      idReceptor: this.usuario.id,
      mensaje: form.value.mensaje
    };

    this._usuarioService.enviarMensaje(nuevoMensaje);
    this.moverScroll();
    form.reset();
  }



  moverScroll(){
    setTimeout(() => {
      this.boxMensajes.nativeElement.scrollTop = this.boxMensajes.nativeElement.scrollHeight;
    }, 100);

  }

}
