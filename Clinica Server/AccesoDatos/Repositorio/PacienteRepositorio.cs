using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Repositorio
{
    public class PacienteRepositorio : Repositorio<Paciente>, IPacienteRepositorio
    {
        public PacienteRepositorio(ClinicaEntities context) : base(context)
        {
        }

        public ClinicaEntities ClinicaEntities
        {
            get { return Context as ClinicaEntities; }
        }

        public Paciente ObtenerPacienteConCitas(int id)
        {
            return ClinicaEntities.Pacientes.
               Include(p => p.Citas).
               FirstOrDefault(p => p.Id == id);
        }

    }
}
