import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RtaApi, Usuario } from 'src/app/models/RtaApi.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url = "http://localhost:3000";
  private _headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this._headers.set('content-type', 'application/json');
  }

  async iniciarSesion(usuario: string, clave: string):Promise<RtaApi<Usuario>> {
    const body = { usuario, clave };
    return await this.http.post<RtaApi<Usuario>>(`${this._url}/usuario/iniciarSesion`, body, { headers: this._headers }).toPromise();
  }
}
