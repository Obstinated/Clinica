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
    }
}
