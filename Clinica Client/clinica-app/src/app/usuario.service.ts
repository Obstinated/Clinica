import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IUsuario } from './usuario';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsuarioService {

  private _url = '/api/Autenticacion/Autenticar';
  private usuario: IUsuario;

  constructor(private http: HttpClient) { }

  autenticarUsuario(usuario, contrasenna) {
    usuario = this.http
    .get<IUsuario>(this._url + '?usuario=' + usuario + '&contrasenna=' + contrasenna)
    .do(data => console.log('Usuarios : ' + JSON.stringify(data)));
    return usuario;
  }

  obtenerUsuario() {
    return this.usuario;
  }

}
