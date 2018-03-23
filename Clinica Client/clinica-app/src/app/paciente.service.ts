import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { IPaciente } from './Paciente';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PacienteService {

  private _url = '/api/Paciente';
  constructor(private http: HttpClient) { }

  obtenerTodosPacientes(): Observable<IPaciente[]> {
    return this.http
    .get<IPaciente[]>(this._url)
    .do(data => console.log('Pacientes : ' + JSON.stringify(data)));
  }
}
