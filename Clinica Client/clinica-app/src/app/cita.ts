import { IPaciente } from './paciente';
import { ITipoCita } from './tipoCita';

export interface ICita {
    Id: number;
    PacienteId: number;
    Fecha: Date;
    TipoCitaId: number;
    Paciente: IPaciente;
    TipoCita: ITipoCita;
}
