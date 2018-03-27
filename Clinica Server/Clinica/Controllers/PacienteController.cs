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
            Paciente paciente = convertirAObjeto(value);
            paciente.Id = id;
            repositorio.Editar(paciente);
            repositorio.Guardar();
        }

        // DELETE: api/Paciente/5
        public void Delete(int id)
        {
            Paciente pacietne = repositorio.Obtener(id);
            IEnumerable<Cita> citas = citaRepositorio.Buscar(c => c.PacienteId == id);
            citaRepositorio.EliminarVarios(citas);
            citaRepositorio.Guardar();
            repositorio.Eliminar(pacietne);
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
