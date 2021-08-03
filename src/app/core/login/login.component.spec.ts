import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoginComponent } from './login.component';

import { RouterTestingModule } from '@angular/router/testing';

import { usuarioLoginVacio, usuarioLoginValida,testUserData } from 'src/mocks'
import { LoginService } from 'src/app/services/login/login.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
const loginServiceSpy = jasmine.createSpyObj('LoginService', ['iniciarSesion']);



describe('Login: Pruebas unitarias', () => {
  let component: LoginComponent;

  beforeEach(async () => {
    component = new LoginComponent(routerSpy, loginServiceSpy);
  })

  it('Componente creado', () => {
    expect(component).toBeTruthy();
  })

  it('Componente inicializado', () => {
    expect(component.frmDatos).toBeDefined();
    expect(component.frmDatos.invalid).toBeTruthy();
  })

  it('Iniciando sesión con datos erroneos', () => {
    component.onIniciarSesion(usuarioLoginVacio);
    expect(component.existeError).toBeTrue();
  })

  it('Iniciando sesión con datos verdaderos', () => {
    component.onIniciarSesion(usuarioLoginValida);
    expect(component.existeError).toBeFalse();
  })

});

describe('Login: Prueba de integración con LoginService', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let loginSpy;

  function actualizarFormulario(usuario, clave) {
    fixture.componentInstance.frmDatos.controls['usuario'].setValue(usuario);
    fixture.componentInstance.frmDatos.controls['clave'].setValue(clave);
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: LoginService, useValue: loginServiceSpy },
        FormBuilder,
        { provide: Router, useValue: routerSpy },
      ],
      declarations: [
        LoginComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    loginSpy = loginServiceSpy.iniciarSesion.and.returnValue(Promise.resolve(testUserData));
  })

  it('Probar método de iniciarSesion() ',fakeAsync(()=>{
    actualizarFormulario(usuarioLoginValida.usuario,usuarioLoginValida.clave);
    fixture.detectChanges();
    const btnFormulario = fixture.debugElement.nativeElement.querySelector('button');
    btnFormulario.click();
    fixture.detectChanges();
    expect(loginServiceSpy.iniciarSesion).toHaveBeenCalled();
  }));

  it('Prueba de ruteo a dashboard',fakeAsync(()=>{
    actualizarFormulario(usuarioLoginValida.usuario,usuarioLoginValida.clave);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    advance(fixture);

    loginSpy = loginServiceSpy.iniciarSesion.and.returnValue(Promise.resolve(testUserData));
    advance(fixture);
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
    const navArgs = routerSpy.navigateByUrl.calls.first().args[0];
    expect(navArgs).toBe('dashboard');
  }))

  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
})

