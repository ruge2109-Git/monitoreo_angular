export interface MensajeChat {
  id?: string;
  idRemitente: string;
  idReceptor: string;
  mensaje?: string;
  fechaMensaje?: Date;
  esAdmin?:boolean;
}
