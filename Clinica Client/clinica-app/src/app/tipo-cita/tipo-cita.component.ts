import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IUsuario } from '../usuario';
import { ITipoCita } from '../tipoCita';
import { TipoCitaService } from '../tipo-cita.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tipo-cita',
  templateUrl: './tipo-cita.component.html',
  styleUrls: ['./tipo-cita.component.css']
})
export class TipoCitaComponent implements OnInit {

  public tipoCitas: ITipoCita[];
  public latipoCita: ITipoCita;

  constructor(private _tipoCitaService: TipoCitaService, private modalService: NgbModal) { }

  ngOnInit() {
    this._tipoCitaService.obtenerTodosTiposCita()
        .subscribe(data => { console.log(data); this.tipoCitas = data;
        }, err => { console.log(err);
        });
  }

}
