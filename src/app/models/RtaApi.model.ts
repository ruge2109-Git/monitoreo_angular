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
  _id:string;
  usuario:string;
  clave:string;
  tipoUsuario:number;
  online:boolean;
}
