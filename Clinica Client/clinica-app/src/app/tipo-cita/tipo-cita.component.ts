import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { TipoCitaService } from '../tipo-cita.service';
import { UsuarioService } from '../usuario.service';

import { ITipoCita } from '../tipoCita';
import { IUsuario } from '../usuario';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

const now = new Date();

@Component({
  selector: 'app-tipo-cita',
  templateUrl: './tipo-cita.component.html',
  styleUrls: ['./tipo-cita.component.css']
})

export class TipoCitaComponent implements OnInit {
  public elUsuario: any;
  public closeResult: string;
  public accion: string;
  public tipoCitas: ITipoCita[];
  public elTipoCita: ITipoCita;

  constructor(private _tipoCitaService: TipoCitaService
    , private _usuarioService: UsuarioService
    , private _modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerTipoCitas();
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.elUsuario = this._usuarioService.obtenerUsuario();
  }

  obtenerTipoCitas() {
    this._tipoCitaService.obtenerTodosTiposCita().subscribe(
      data => { this.tipoCitas = data; },
      err => console.error(err),
      () => console.log('Se cargaron las tipo de Citas')
    );
  }

  eliminarTipoCita(id) {
      if (confirm('¿Está seguro que quiere eliminar la tipo de Cita?')) {
        this._tipoCitaService.eliminarTipoCita(id).subscribe(
                data => {
                  this.obtenerTipoCitas();
                return true;
              },
            error => {
                console.error('¡Error elimiando la tipo de Cita!');
                return Observable.throw(error);
              }
        );
      }
  }

  crearTipoCita(tipoCita: ITipoCita) {
    this._tipoCitaService.crearTipoCita(tipoCita).subscribe(
            data => {
              this.obtenerTipoCitas();
            return true;
          },
        error => {
          console.error('¡Error creando la tipo de Cita!');
            return Observable.throw(error);
          }
    );
  }

  actualizarTipoCita(tipoCita: ITipoCita) {
    this._tipoCitaService.actualizarTipoCita(tipoCita).subscribe(
            data => {
              this.obtenerTipoCitas();
            return true;
          },
        error => {
          console.error('¡Error actualizando la tipo de Cita!');
            return Observable.throw(error);
          }
    );
  }

  abrirAgregar(content) {
    this.accion = 'Agregar';
    this.reiniciarLaTipoCita();
    this.mostrarModal(content);
  }

  abrirEditar(content, tipoCita) {
    this.accion = 'Editar';
    this.elTipoCita = tipoCita;
    this.mostrarModal(content);
  }

  mostrarModal(content) {
    this._modalService.open(content);
  }

  reiniciarLaTipoCita() {
    this.elTipoCita = {
      Id: 0,
      Descripcion: null,
    };
  }

  realizarAccion(accionRealizada) {
    console.log(accionRealizada);
    if (accionRealizada === 'Agregar') {
      this._tipoCitaService.crearTipoCita(this.elTipoCita).subscribe(
        response => console.log(response),
        err => console.log(err)
      );
    }
    if (accionRealizada === 'Editar') {
      this._tipoCitaService.actualizarTipoCita(this.elTipoCita).subscribe(
        response => console.log(response),
        err => console.log(err)
      );
    }
    this.obtenerTipoCitas();
  }

}
