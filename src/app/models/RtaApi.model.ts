export interface RtaApiSencilla{
  flag:boolean;
  msg:string;
}

export interface RtaApi<T>{
  flag:boolean;
  msg:string;
  data:T;
}

export interface Usuario{
  id:string;
  usuario:string;
  clave:string;
  tipoUsuario:number;
  online:boolean;
}
