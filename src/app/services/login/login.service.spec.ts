import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Login Service: Creación de componente', () => {
  let service: LoginService;

  beforeEach(()=>TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ],
    providers:[
      LoginService
    ]
  }))

  it('Crear servicio Login',()=>{
    const servicio:LoginService = TestBed.inject(LoginService);
    expect(servicio).toBeTruthy();
  })
});
