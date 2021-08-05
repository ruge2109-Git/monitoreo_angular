import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RtaApi, Usuario } from '../models/RtaApi.model';
import { MensajeChat } from '../models/socket.model';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _headers = new HttpHeaders();

  constructor(
    private _socketService: WebSocketService,
    private _http: HttpClient) {
    this._headers.set('content-type', 'application/json');
  }

  obtenerTodosLosUsuariosSocket() {
    return this._socketService.fromEvent<RtaApi<Usuario[]>>('listaUsuarios');
  }

  obtenerTodosLosUsuariosApi() {
    return this._http.get<RtaApi<Usuario[]>>(`${environment.URL_SERVER}/usuario`, { headers: this._headers });
  }

  obtenerTodosLosMensajesSocket() {
    return this._socketService.fromEvent<RtaApi<MensajeChat[]>>('mensajeRecibido');
  }

  obtenerTodosLosMensajesSocketPrimeraVez(mensaje:MensajeChat){
    this._socketService.emit('mensajesRecibidos', mensaje)
  }

  enviarMensaje(mensaje:MensajeChat){
    this._socketService.emit('nuevoMensaje',mensaje);
  }

  eliminarListeners(){
    this._socketService.removeAllListeners();
  }
}
