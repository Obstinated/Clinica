import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IPaciente } from './paciente';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PacienteService {

  private _url = '/api/Paciente/';

  constructor(private http: HttpClient) { }

  obtenerTodosPacientes(): Observable<IPaciente[]> {
    return this.http
     .get<IPaciente[]>(this._url)
      .catch(this.manejarError);
  }

  obtenerPaciente(id): Observable<IPaciente> {
    return this.http
      .get<IPaciente>(this._url + id)
        .catch(this.manejarError);
  }

   eliminarPaciente(id) {
     return this.http.delete(this._url + id)
      .catch(this.manejarError);
   }

  crearPaciente(paciente: IPaciente) {
    const body = JSON.stringify(paciente);
    console.log('entra a crear ' + this._url + body);
    return this.http.post(this._url, this.conviertaBody(body), httpOptions)
    .catch(this.manejarError);
    }

  actualizarPaciente(paciente: IPaciente) {
      const body = JSON.stringify(paciente);
      console.log('entra a actualziar ' + this._url + body);
    return this.http.put(this._url + paciente.Id, this.conviertaBody(body), httpOptions)
      .catch(this.manejarError);
    }

    conviertaBody(body: string): string {
      const re = /"/gi;
      const newstr = '"' + body.replace(re, '\'') + '"';
      console.log(newstr);
      return newstr;
    }

    manejarError = (error: any) => {
      console.log(error.error.Message);
      window.alert(error.error.Message);
      return Observable.throw(error);
  }

}
