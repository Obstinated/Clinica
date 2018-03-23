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
    public class TipoCitaController : ApiController
    {

        private TipoCitaRepositorio repositorio = new TipoCitaRepositorio(new ClinicaEntities());

        // GET: api/TipoCita
        public IEnumerable<TipoCita> Get()
        {
            IEnumerable<TipoCita> TipoCitas = repositorio.ObtenerTodos();
            return TipoCitas;
        }

        // GET: api/TipoCita/5
        public TipoCita Get(int id)
        {
            TipoCita TipoCita = repositorio.Obtener(id);
            return TipoCita;
        }

        // POST: api/TipoCita
        public void Post([FromBody]string value)
        {
            TipoCita TipoCita = JsonConvert.DeserializeObject<TipoCita>(value);
            repositorio.Agregar(TipoCita);
            repositorio.Guardar();
        }

        // PUT: api/TipoCita/5
        public void Put(int id, [FromBody]string value)
        {
            Delete(id);
            TipoCita TipoCitaNueva = JsonConvert.DeserializeObject<TipoCita>(value);
            repositorio.Agregar(TipoCitaNueva);
            repositorio.Guardar();
        }

        // DELETE: api/TipoCita/5
        public void Delete(int id)
        {
            TipoCita TipoCitaVieja = repositorio.Obtener(id);
            repositorio.Eliminar(TipoCitaVieja);
            repositorio.Guardar();
        }
    }
}
