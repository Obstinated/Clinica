import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { CitaComponent } from './cita/cita.component';
import { TipoCitaComponent } from './tipo-cita/tipo-cita.component';
import { PacienteComponent } from './paciente/paciente.component';

import { UsuarioService } from './usuario.service';
import { CitaService } from './cita.service';
import { PacienteService } from './paciente.service';
import { TipoCitaService } from './tipo-cita.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CitaComponent,
    TipoCitaComponent,
    PacienteComponent,
    MenuComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [UsuarioService, CitaService, PacienteService, TipoCitaService, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
