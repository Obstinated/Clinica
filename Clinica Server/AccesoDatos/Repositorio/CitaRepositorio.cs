using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Repositorio
{
    public class CitaRepositorio : Repositorio<Cita>, ICitaRepositorio
    {
        public CitaRepositorio(ClinicaEntities context) : base(context)
        {
        }

        public ClinicaEntities ClinicaEntities
        {
            get { return Context as ClinicaEntities; }
        }

        public Boolean VerificarCita(Cita cita)
        {
            Cita citaEncontrada = ClinicaEntities.Citas.
                FirstOrDefault(c => c.Fecha == cita.Fecha && c.PacienteId == cita.PacienteId);
            return citaEncontrada == null ? true : false;
        }

        public new Cita Obtener(int id)
        {
            return ClinicaEntities.Citas.
                Include(c => c.Paciente).
                Include(c => c.TipoCita).
               FirstOrDefault(c => c.Id == id);
        }

        public new IEnumerable<Cita> ObtenerTodos()
        {
            return ClinicaEntities.Citas.
                Include(c => c.Paciente).
                ToList();
        }
    }
}
