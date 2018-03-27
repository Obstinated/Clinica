import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ITipoCita } from './tipoCita';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TipoCitaService {

  private _url = '/api/TipoCita/';

  constructor(private http: HttpClient) { }

  obtenerTodosTiposCita(): Observable<ITipoCita[]> {
    return this.http
     .get<ITipoCita[]>(this._url)
      .catch(this.manejarError);
  }

  obtenerTipoCita(id): Observable<ITipoCita> {
    return this.http
      .get<ITipoCita>(this._url + id)
        .catch(this.manejarError);
  }

   eliminarTipoCita(id) {
     return this.http.delete(this._url + id)
      .catch(this.manejarError);
   }

  crearTipoCita(tipoCita: ITipoCita) {
    const body = JSON.stringify(tipoCita);
    console.log('entra a crear ' + this._url + body);
    return this.http.post(this._url, this.conviertaBody(body), httpOptions)
    .catch(this.manejarError);
    }

  actualizarTipoCita(tipoCita: ITipoCita) {
      const body = JSON.stringify(tipoCita);
      console.log('entra a actualziar ' + this._url + body);
    return this.http.put(this._url + tipoCita.Id, this.conviertaBody(body), httpOptions)
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
