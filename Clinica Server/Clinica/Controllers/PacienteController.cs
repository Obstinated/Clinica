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
    public class PacienteController : ApiController
    {

        private PacienteRepositorio repositorio = new PacienteRepositorio(new ClinicaEntities());

        // GET: api/Paciente
        public IEnumerable<Paciente> Get()
        {
            IEnumerable<Paciente> Pacientes = repositorio.ObtenerTodos();
            return Pacientes;
        }

        // GET: api/Paciente/5
        public Paciente Get(int id)
        {
            Paciente Paciente = repositorio.Obtener(id);
            return Paciente;
        }

        // POST: api/Paciente
        public void Post([FromBody]string value)
        {
            Paciente Paciente = JsonConvert.DeserializeObject<Paciente>(value);
            repositorio.Agregar(Paciente);
            repositorio.Guardar();
        }

        // PUT: api/Paciente/5
        public void Put(int id, [FromBody]string value)
        {
            Delete(id);
            Paciente PacienteNueva = JsonConvert.DeserializeObject<Paciente>(value);
            repositorio.Agregar(PacienteNueva);
            repositorio.Guardar();
        }

        // DELETE: api/Paciente/5
        public void Delete(int id)
        {
            Paciente PacienteVieja = repositorio.Obtener(id);
            repositorio.Eliminar(PacienteVieja);
            repositorio.Guardar();
        }
    }
}
