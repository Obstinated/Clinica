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
            string mensajeError = repositorio.VerificarCita(cita);
            if (mensajeError.Length == 0)
            {
                repositorio.Agregar(cita);
                repositorio.Guardar();
            }
            else
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.Forbidden, mensajeError));
            }
        }

        // PUT: api/Cita/5
        public void Put(int id, [FromBody]string value)
        {
            Cita citaNueva = convertirAObjeto(value);
            string mensajeError = repositorio.VerificarCita(citaNueva);
            if (mensajeError.Length == 0)
            {
                Delete(id);
                repositorio.Agregar(citaNueva);
                repositorio.Guardar();
            }
            else
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.Forbidden, mensajeError));
            }
        }

        // DELETE: api/Cita/5
        public void Delete(int id)
        {
            Cita cita = repositorio.Obtener(id);
            repositorio.Eliminar(cita);
            repositorio.Guardar();
        }

        private Cita convertirAObjeto(string value)
        {
            try
            {
                return JsonConvert.DeserializeObject<Cita>(value);
            }
            catch (Exception e)
            {
                string mensajeError = "Faltan campos requeridos por llenar";
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.Forbidden, mensajeError));
            }

        }
        
    }
}
