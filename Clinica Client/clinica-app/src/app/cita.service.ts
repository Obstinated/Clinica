import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ICita } from './cita';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CitaService {

  private _url = '/api/Cita';

  constructor(private http: HttpClient) { }

  obtenerTodasCitas(): Observable<ICita[]> {
    return this.http
    .get<ICita[]>(this._url)
    .do(data => console.log('Citas : ' + JSON.stringify(data)));
  }

  eliminarCita(id) {
    return this.http.delete(this._url + '/' + id);
  }

}
