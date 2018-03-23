import { Component, OnInit } from '@angular/core';
import { CitaService } from '../cita.service';
import { ICita } from '../cita';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../usuario.service';
import { IUsuario } from '../usuario';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  public elUsuario: IUsuario;
  public citas: ICita[];

  constructor(private _citaService: CitaService, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    this._citaService.obtenerTodasCitas()
        .subscribe(data => { console.log(data); this.citas = data;
        }, err => { console.log(err);
        });
    this.elUsuario = this._usuarioService.obtenerUsuario();
  }

  eliminarCita(id) {
    console.log(this._citaService.eliminarCita(id));
  }

}
