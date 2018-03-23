import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from '../usuario';
import { IPaciente } from '../paciente';
import { PacienteService } from '../paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  public pacientes: IPaciente[];
  public laPaciente: IPaciente;

  constructor(private _pacienteService: PacienteService) { }

  ngOnInit() {
    this._pacienteService.obtenerTodosPacientes()
        .subscribe(data => { console.log(data); this.pacientes = data;
        }, err => { console.log(err);
        });
  }

}
