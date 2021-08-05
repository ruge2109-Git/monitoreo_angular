import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService extends Socket{

  constructor() {
    super({
      url:environment.URL_SOCKET
    })
  }

}
