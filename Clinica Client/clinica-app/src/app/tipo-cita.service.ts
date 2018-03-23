import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ITipoCita } from './tipoCita';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TipoCitaService {

  private _url = '/api/tipoCita';
  constructor(private http: HttpClient) { }

  obtenerTodosTiposCita(): Observable<ITipoCita[]> {
    return this.http
    .get<ITipoCita[]>(this._url)
    .do(data => console.log('TipoCitas : ' + JSON.stringify(data)));
  }
}
