import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { CitaService } from '../cita.service';
import { UsuarioService } from '../usuario.service';
import { PacienteService } from '../paciente.service';

import { ICita } from '../cita';
import { IUsuario } from '../usuario';
import { IPaciente } from '../paciente';
import { ITipoCita } from '../tipoCita';
import { TipoCitaService } from '../tipo-cita.service';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

const now = new Date();

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})

export class CitaComponent implements OnInit {
  public closeResult: string;
  public accion: string;
  public citas: ICita[];
  public laCita: ICita;
  public pacientes: IPaciente[];
  public tiposCita: ITipoCita[];
  private fecha;
  private elUsuario: IUsuario;

  constructor(private _citaService: CitaService
    , private _usuarioService: UsuarioService
    , private _modalService: NgbModal
    , private _pacienteService: PacienteService
    , private _tipoCitaService: TipoCitaService) { }

  ngOnInit() {
    this.obtenerCitas();
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.elUsuario = this._usuarioService.obtenerUsuario();
  }

  obtenerCitas() {
    this._citaService.obtenerTodasCitas().subscribe(
      data => { this.citas = data; },
      err => console.error(err),
      () => console.log('Se cargaron las citas')
    );
  }

  eliminarCita(id) {
      if (confirm('¿Está seguro que quiere eliminar la cita?')) {
        this._citaService.eliminarCita(id).subscribe(
               data => {
                 this.obtenerCitas();
               return true;
             },
           error => {
               console.error('¡Error elimiando la cita!');
               return Observable.throw(error);
             }
        );
      }
  }

  crearCita(cita: ICita) {
    this._citaService.crearCita(cita).subscribe(
           data => {
             this.obtenerCitas();
           return true;
         },
       error => {
         console.error('¡Error creando la cita!');
           return Observable.throw(error);
         }
    );
  }

  actualizarCita(cita: ICita) {
    this._citaService.actualizarCita(cita).subscribe(
           data => {
             this.obtenerCitas();
           return true;
         },
       error => {
         console.error('¡Error actualizando la cita!');
           return Observable.throw(error);
         }
    );
  }

  abrirAgendar(content) {
    this.accion = 'Agendar';
    this.reiniciarLaCita();
    this.llenarObjetos();
    this.mostrarModal(content);
  }

  abrirEditar(content, cita) {
    this.accion = 'Editar';
    this.laCita = cita;
    this.llenarObjetos();
    this.mostrarModal(content);
  }

  mostrarModal(content) {
    this._modalService.open(content);
  }

  reiniciarLaCita() {
    this.laCita = {
      Fecha: new Date(),
      Id: 0,
      Paciente: null,
      PacienteId: null,
      TipoCita: null,
      TipoCitaId: null
    };
  }

  private llenarObjetos() {
    this._tipoCitaService.obtenerTodosTiposCita().subscribe(
      data => { this.tiposCita = data; },
      err => console.error(err),
      () => console.log('Se cargaron los tipos de cita')
    );
    this._pacienteService.obtenerTodosPacientes().subscribe(
      data => { this.pacientes = data; },
      err => console.error(err),
      () => console.log('Se cargaron los pacientes')
    );
    const fechaDate = new Date(this.laCita.Fecha);
    console.log(JSON.stringify(fechaDate));
    console.log(fechaDate.getMonth());
    this.fecha = {
      year: fechaDate.getFullYear(),
      month: fechaDate.getMonth() + 1,
      day: fechaDate.getDate() + 1
    };
  }

  realizarAccion(accionRealizada) {
    console.log(accionRealizada);
    this.laCita.Fecha = new Date(this.fecha.year + '-' + this.fecha.month + '-' + this.fecha.day);
    if (accionRealizada === 'Agendar') {
      this._citaService.crearCita(this.laCita).subscribe(
        response => console.log(response),
        err => console.log(err)
      );
    }
    if (accionRealizada === 'Editar') {
      this._citaService.actualizarCita(this.laCita).subscribe(
        response => console.log(response),
        err => console.log(err)
      );
    }
    this.obtenerCitas();
  }

}
