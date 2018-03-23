import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsuarioService } from './usuario.service';
import { CitaService } from './cita.service';
import { HttpClientModule } from '@angular/common/http';
import { CitaComponent } from './cita/cita.component';
import { TipoCitaComponent } from './tipo-cita/tipo-cita.component';
import { PacienteComponent } from './paciente/paciente.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PacienteService } from './paciente.service';
import { TipoCitaService } from './tipo-cita.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  ],
  providers: [UsuarioService, CitaService, PacienteService, TipoCitaService, NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
