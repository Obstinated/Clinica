import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public mostrarCitas = true;
  public mostrarPacientes = false;
  public mostrarTiposCita = false;

  constructor() { }

  ngOnInit() {
  }

  public seleccionarCitas() {
    this.mostrarCitas = true;
    this.mostrarPacientes = false;
    this.mostrarTiposCita = false;
  }

  public seleccionarPacientes() {
    this.mostrarCitas = false;
    this.mostrarPacientes = true;
    this.mostrarTiposCita = false;
  }

  public seleccionarTiposCita() {
    this.mostrarCitas = false;
    this.mostrarPacientes = false;
    this.mostrarTiposCita = true;
  }
}
