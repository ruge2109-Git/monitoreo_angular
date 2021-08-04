import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public frmDatos:FormGroup;
  public existeError:boolean = false;

  constructor(
    private _router:Router,
    private _loginService:LoginService
  ) {
    this.frmDatos = new FormGroup({
      usuario: new FormControl('',[Validators.required]),
      clave: new FormControl('',[Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  async onIniciarSesion(data){
    if (data==null || data.usuario==null ||data.usuario=='' || data.clave==null ||data.clave=='' ) {
      this.existeError = true;
      return;
    }

    await this._loginService.iniciarSesion(data.usuario,data.clave).then((data)=>{
      if (!data.flag) {
        this.existeError = false;
        return;
      }
      sessionStorage.setItem('key',btoa(JSON.stringify(data.data)));
      this._router.navigateByUrl('dashboard');
    }).catch((e)=>{
      console.log(e);
    })


  }

}
