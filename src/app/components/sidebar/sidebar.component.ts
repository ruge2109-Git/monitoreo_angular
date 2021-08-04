import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

interface Menu {
  nomMenu: string;
  icono: string;
  ruta: string;
  activo: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public listaMenu: Menu[] = [];

  constructor(private _route:Router) { }

  ngOnInit(): void {
    this.inicializarMenu();
    this.rutaActiva();
  }

  inicializarMenu() {
    this.listaMenu = [
      { nomMenu: 'Usuarios', icono: '', ruta: '/dashboard/usuarios', activo: false },
      { nomMenu: 'Configuración', icono: '', ruta: '/dashboard/configuracion', activo: false }
    ]
  }

  rutaActiva() {
    this.listaMenu.forEach(element => {
      if (element.ruta === this._route.url) {
        element.activo = true;
      }
    });
  }


  cambiarActivo(menu: Menu) {
    this.listaMenu.forEach((element) => {
      element.activo = false;
    });
    menu.activo = true;
    this._route.navigate([menu.ruta]);
  }

}
