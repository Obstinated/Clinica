using AccesoDatos;
using AccesoDatos.Repositorio;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Clinica.Controllers
{
    public class CitaController : ApiController
    {

        private CitaRepositorio repositorio = new CitaRepositorio(new ClinicaEntities());

        // GET: api/Cita
        public IEnumerable<Cita> Get()
        {
            IEnumerable<Cita> citas = repositorio.ObtenerTodos();
            return citas;
        }

        // GET: api/Cita/5
        public Cita Get(int id)
        {
            Cita cita = repositorio.Obtener(id);
            return cita;
        }

        // POST: api/Cita
        public void Post([FromBody]string value)
        {
            Cita cita = JsonConvert.DeserializeObject<Cita>(value);
            if (repositorio.VerificarCita(cita))
            {
                repositorio.Agregar(cita);
                repositorio.Guardar();
            }
        }

        // PUT: api/Cita/5
        public void Put(int id, [FromBody]string value)
        {
            Cita citaNueva = JsonConvert.DeserializeObject<Cita>(value);
            if (repositorio.VerificarCita(citaNueva))
             {
                Delete(id);
                repositorio.Agregar(citaNueva);
                repositorio.Guardar();
             }
        }

        // DELETE: api/Cita/5
        public void Delete(int id)
        {
            Cita citaVieja = repositorio.Obtener(id);
            repositorio.Eliminar(citaVieja);
            repositorio.Guardar();
        }
        
    }
}
