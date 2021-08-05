import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppbarComponent } from './components/appbar/appbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { ChatComponent } from './components/chat/chat.component';
import { MapaComponent } from './components/mapa/mapa.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    AppbarComponent,
    FooterComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    ChatComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
