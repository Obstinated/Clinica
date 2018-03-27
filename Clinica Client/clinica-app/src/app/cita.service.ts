import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ICita } from './cita';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CitaService {

  private _url = '/api/Cita/';

  constructor(private http: HttpClient) { }

  obtenerTodasCitas(): Observable<ICita[]> {
    return this.http
     .get<ICita[]>(this._url)
      .catch(this.manejarError);
  }

  obtenerCita(id): Observable<ICita> {
    return this.http
      .get<ICita>(this._url + id)
        .catch(this.manejarError);
  }

   eliminarCita(id) {
     return this.http.delete(this._url + id)
      .catch(this.manejarError);
   }

  crearCita(cita: ICita) {
    const body = JSON.stringify(cita);
    console.log('entra a crear ' + this._url + body);
    return this.http.post(this._url, this.conviertaBody(body), httpOptions)
    .catch(this.manejarError);
    }

  actualizarCita(cita: ICita) {
      const body = JSON.stringify(cita);
      console.log('entra a actualziar ' + this._url + body);
    return this.http.put(this._url + cita.Id, this.conviertaBody(body), httpOptions)
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
