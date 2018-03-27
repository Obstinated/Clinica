using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Repositorio
{
    public class TipoCitaRepositorio : Repositorio<TipoCita>, ITipoCitaRepositorio
    {
        public TipoCitaRepositorio(ClinicaEntities context) : base(context)
        {
        }

        public ClinicaEntities ClinicaEntities
        {
            get { return Context as ClinicaEntities; }
        }

        public TipoCita ObtenerTipoCitaConCitas(int id)
        {
            return ClinicaEntities.TipoCitas.
                Include(tc => tc.Citas).
               FirstOrDefault(tc => tc.Id == id);
        }
    }
}
