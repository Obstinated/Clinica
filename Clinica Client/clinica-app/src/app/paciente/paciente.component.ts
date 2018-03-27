import { NgbModal, ModalDismissReasons, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { PacienteService } from '../paciente.service';
import { UsuarioService } from '../usuario.service';

import { IPaciente } from '../paciente';
import { IUsuario } from '../usuario';
import { Observable } from 'rxjs/Observable';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

const now = new Date();

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})

export class PacienteComponent implements OnInit {
  public elUsuario: any;
  public closeResult: string;
  public accion: string;
  public pacientes: IPaciente[];
  public elPaciente: IPaciente;

  constructor(private _pacienteService: PacienteService
    , private _usuarioService: UsuarioService
    , private _modalService: NgbModal) { }

  ngOnInit() {
    this.obtenerPacientes();
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this.elUsuario = this._usuarioService.obtenerUsuario();
  }

  obtenerPacientes() {
    this._pacienteService.obtenerTodosPacientes().subscribe(
      data => { this.pacientes = data; },
      err => console.error(err),
      () => console.log('Se cargaron las pacientes')
    );
  }

  eliminarPaciente(id) {
      if (confirm('¿Está seguro que quiere eliminar la paciente?')) {
        this._pacienteService.eliminarPaciente(id).subscribe(
                data => {
                  this.obtenerPacientes();
                return true;
              },
            error => {
                console.error('¡Error elimiando la paciente!');
                return Observable.throw(error);
              }
        );
      }
  }

  crearPaciente(paciente: IPaciente) {
    this._pacienteService.crearPaciente(paciente).subscribe(
            data => {
              this.obtenerPacientes();
            return true;
          },
        error => {
          console.error('¡Error creando la paciente!');
            return Observable.throw(error);
          }
    );
  }

  actualizarPaciente(paciente: IPaciente) {
    this._pacienteService.actualizarPaciente(paciente).subscribe(
            data => {
              this.obtenerPacientes();
            return true;
          },
        error => {
          console.error('¡Error actualizando la paciente!');
            return Observable.throw(error);
          }
    );
  }

  abrirAgregar(content) {
    this.accion = 'Agregar';
    this.reiniciarLaPaciente();
    this.mostrarModal(content);
  }

  abrirEditar(content, paciente) {
    this.accion = 'Editar';
    this.elPaciente = paciente;
    this.mostrarModal(content);
  }

  mostrarModal(content) {
    this._modalService.open(content);
  }

  reiniciarLaPaciente() {
    this.elPaciente = {
      Id: 0,
      Nombre: null,
      Edad: null,
      Sexo: null,
    };
  }

  realizarAccion(accionRealizada) {
    console.log(accionRealizada);
    if (accionRealizada === 'Agregar') {
      this._pacienteService.crearPaciente(this.elPaciente).subscribe(
        response => console.log(response),
        err => console.log(err)
      );
    }
    if (accionRealizada === 'Editar') {
      this._pacienteService.actualizarPaciente(this.elPaciente).subscribe(
        response => console.log(response),
        err => console.log(err)
      );
    }
    this.obtenerPacientes();
  }

}
