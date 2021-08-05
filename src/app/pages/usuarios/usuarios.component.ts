import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RtaApi, Usuario } from 'src/app/models/RtaApi.model';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

  constructor(
    private _usuarioService:UsuarioService,
    private _loginService:LoginService
    ) { }

  ngOnInit(): void {
    this.inicializarUsuarios();
  }


  inicializarUsuarios() {

    this._usuarioService.obtenerTodosLosUsuariosApi().subscribe((data)=>{
      this.logicaObtenerUsuarios(data);
    })

    this._usuarioService.obtenerTodosLosUsuariosSocket().subscribe((data)=>{
      this.logicaObtenerUsuarios(data);
    })

  }

  logicaObtenerUsuarios(data:RtaApi<Usuario[]>){
    if (!data.flag) return;
    let usuariosTotales = data.data.map((usu)=>{
      return {
        ...usu,
        chatActivo:false
      };
    });

    usuariosTotales = usuariosTotales.filter((usuario)=> usuario.id!=this._loginService.obtenerUsuarioLogueado().id);

    this.paginar(usuariosTotales);
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
