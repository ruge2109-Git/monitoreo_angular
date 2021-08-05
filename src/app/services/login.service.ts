import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RtaApi, Usuario } from 'src/app/models/RtaApi.model';
import { environment } from 'src/environments/environment';
import { WebSocketService } from './web-socket.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _headers = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private _socketService: WebSocketService
    ) {
    this._headers.set('content-type', 'application/json');
  }

  async iniciarSesion(usuario: string, clave: string):Promise<RtaApi<Usuario>> {
    const body = {
      usuario,
      clave
    };
    return await this.http.post<RtaApi<Usuario>>(`${environment.URL_SERVER}/usuario/iniciarSesion`, body, { headers: this._headers }).toPromise();
  }

  conectarSocket(idUsuario:string){
    this._socketService.emit('conectar',idUsuario);
  }

  async cerrarSesion(usuario:Usuario){
    const body={
      online:false
    };
    return await this.http.patch<RtaApi<Usuario>>(`${environment.URL_SERVER}/usuario/${usuario.id}`, body, { headers: this._headers }).toPromise();
  }

  obtenerUsuarioLogueado():Usuario{
    const dataSesion = sessionStorage.getItem('key');
    const dataBase64 = atob(dataSesion);
    const dataJSON = JSON.parse(dataBase64);
    return dataJSON;
  }
}
