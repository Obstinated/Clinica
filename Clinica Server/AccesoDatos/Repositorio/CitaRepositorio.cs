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

        public string VerificarCita(Cita cita)
        {
            string mensaje = "";
            Cita citaEncontrada = ClinicaEntities.Citas.
                FirstOrDefault(c => c.Fecha == cita.Fecha && c.PacienteId == cita.PacienteId);

            if (citaEncontrada != null)
                mensaje = "No se puede crear otra cita para el mismo paciente en el mismo día.";

            DateTime hoy = DateTime.Now;
            if (cita.Fecha <= hoy)
                mensaje = "Las citas se deben agendar con mínimo 24 horas de antelación.";

            return mensaje;
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
