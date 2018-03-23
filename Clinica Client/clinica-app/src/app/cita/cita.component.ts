import { CitaService } from '../cita.service';
import { ICita } from '../cita';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../usuario.service';
import { IUsuario } from '../usuario';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';
import { IPaciente } from '../paciente';
import { ITipoCita } from '../tipoCita';
import { TipoCitaService } from '../tipo-cita.service';

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

  constructor(private _citaService: CitaService
    , private _usuarioService: UsuarioService
    , private modalService: NgbModal
    , private _pacienteService: PacienteService
    , private _tipoCitaService: TipoCitaService) { }

  ngOnInit() {
    this._citaService.obtenerTodasCitas()
        .subscribe(data => { console.log(data); this.citas = data;
        }, err => { console.log(err);
        });
  }

  eliminarCita(id) {
    this._citaService.eliminarCita(id);
  }

  editarCita(id, cita: ICita) {
    console.log('cita vieja ' + JSON.stringify(cita));
    this._citaService.editarCita(id, cita)
    .subscribe(data => { console.log(data); this.laCita = data;
    }, err => { console.log(err);
    });
    console.log('cita nueva ' +  JSON.stringify(this.laCita));
  }

  openAgendar(content) {
    this.accion = 'Agendar';
    this.laCita = null;
    this.llenarListas();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditar(content, cita) {
    this.accion = 'Editar';
    this.laCita = cita;
    this.llenarListas();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private llenarListas() {
    this._tipoCitaService.obtenerTodosTiposCita()
        .subscribe(data => { console.log(data); this.tiposCita = data;
        }, err => { console.log(err);
        });
    this._pacienteService.obtenerTodosPacientes()
        .subscribe(data => { console.log(data); this.pacientes = data;
        }, err => { console.log(err);
        });
  }

}
