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
  private elUsuario: IUsuario;

  constructor(private http: HttpClient) { }

  autenticarUsuario(usuario, contrasenna): Observable<IUsuario> {
    return this.http
    .get<IUsuario>(this._url + '?usuario=' + usuario + '&contrasenna=' + contrasenna)
    .do(data => this.elUsuario = data);
  }

  obtenerUsuario(): IUsuario {
    return  this.elUsuario;
  }

  deslogearUsuario() {
    this.elUsuario = null;
  }

}
