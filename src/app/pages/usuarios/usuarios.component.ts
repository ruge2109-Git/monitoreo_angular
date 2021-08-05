import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Usuario } from 'src/app/models/RtaApi.model';

interface UsuarioChat extends Usuario {
  chatActivo: boolean;
}

interface Paginacion {
  pagina: number;
  activa: boolean;
  productos: UsuarioChat[];
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public usuariosTotales: UsuarioChat[] = [];
  public usuariosEnPantalla: UsuarioChat[] = [];
  public cantidadPaginas: Paginacion[] = [];
  public usuarioActivo: Usuario;

  @ViewChild("inputFiltro", { static: true }) inputFiltro!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    this.inicializarUsuarios();
  }


  inicializarUsuarios() {
    this.usuariosTotales = [
      { _id: '', usuario: 'Javier', clave: '', online: false, tipoUsuario: 2, chatActivo: false },
    ]
    this.paginar(this.usuariosTotales);
  }

  cambiarUsuarioActivo(usuario: UsuarioChat) {
    this.usuariosEnPantalla.forEach(element => {
      element.chatActivo = false;
    });

    usuario.chatActivo = true;
    this.usuarioActivo = usuario;
  }


  paginar(categorias: UsuarioChat[]) {

    this.cantidadPaginas = [];
    let contador = 1;
    let cantidadProductos = categorias.length;
    let prodInicio = 0;
    let prodFinal = 6;

    while (cantidadProductos > 0) {

      const prod: Paginacion = {
        pagina: contador,
        activa: false,
        productos: categorias.slice(prodInicio, prodFinal)
      }
      this.cantidadPaginas.push(prod);
      cantidadProductos -= 6;
      contador++;
      prodInicio = prodFinal;
      prodFinal += 6;
    }

    if (this.cantidadPaginas.length > 0) {
      this.cantidadPaginas[0].activa = true;
      this.usuariosEnPantalla = this.cantidadPaginas[0].productos;
    }

  }

  onPaginar(pagina: Paginacion) {
    for (let i = 0; i < this.cantidadPaginas.length; i++) {
      const element = this.cantidadPaginas[i];
      element.activa = false;
      if (element == pagina) {
        this.cantidadPaginas[i].activa = true;
        this.usuariosEnPantalla = this.cantidadPaginas[i].productos;
      }
    }
  }

  siguiente() {
    const itemActivo = this.cantidadPaginas.filter(can => can.activa);
    if (itemActivo[0].pagina == this.cantidadPaginas[this.cantidadPaginas.length - 1].pagina) {
      return;
    }

    for (let i = 0; i < this.cantidadPaginas.length; i++) {
      const element = this.cantidadPaginas[i];
      if (element == itemActivo[0]) {
        element.activa = false;
        this.cantidadPaginas[i + 1].activa = true;
        this.usuariosEnPantalla = this.cantidadPaginas[i + 1].productos;

      }
    }

  }

  anterior() {
    const itemActivo = this.cantidadPaginas.filter(can => can.activa);
    if (itemActivo[0].pagina == 1) {
      return;
    }

    for (let i = 0; i < this.cantidadPaginas.length; i++) {
      const element = this.cantidadPaginas[i];
      if (element == itemActivo[0]) {
        element.activa = false;
        this.cantidadPaginas[i - 1].activa = true;
        this.usuariosEnPantalla = this.cantidadPaginas[i - 1].productos;

      }
    }
  }

  filtrarUsuarioChat() {
    const valor = this.inputFiltro.nativeElement.value;
    if (valor == "") {
      this.paginar(this.usuariosTotales);
      return;
    }

    const productoFiltrado = this.usuariosTotales.filter((e) =>
      (e.usuario.toLowerCase().includes(valor.toLowerCase()))
    );

    if (productoFiltrado.length > 0) {
      this.paginar(productoFiltrado);
    }
    else {
      this.usuariosEnPantalla = [];
    }


  }

}
