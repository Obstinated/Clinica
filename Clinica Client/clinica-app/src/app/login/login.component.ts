import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { IUsuario } from '../usuario';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public elUsuario;

  constructor(private _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  login(usuario, contrasenna) {
    this._usuarioService.autenticarUsuario(usuario, contrasenna)
        .subscribe(data => { console.log(data); this.elUsuario = data;
        }, err => { console.log(err);
        });
  }

  logout() {
    this.elUsuario = null;
  }

}
