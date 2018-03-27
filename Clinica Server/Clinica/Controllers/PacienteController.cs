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
        private CitaRepositorio citaRepositorio = new CitaRepositorio(new ClinicaEntities());

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
            Paciente Paciente = repositorio.ObtenerPacienteConCitas(id);
            citaRepositorio.EliminarVarios(Paciente.Citas);
            repositorio.Eliminar(Paciente);
            repositorio.Guardar();
        }

        private Paciente convertirAObjeto(string value)
        {
            try
            {
                return JsonConvert.DeserializeObject<Paciente>(value);
            }
            catch (Exception e)
            {
                string mensajeError = "Faltan campos requeridos por llenar";
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.Forbidden, mensajeError));
            }

        }
    }
}
