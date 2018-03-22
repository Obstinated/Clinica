using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AccesoDatos;
using AccesoDatos.Repositorio;

namespace Clinica.Controllers
{
    public class ValuesController : ApiController
    {
        private ClinicaEntities db = new ClinicaEntities();
        private UsuarioRepositorio repositorio = new UsuarioRepositorio(new ClinicaEntities());

        // GET api/Autenticar
        public Usuario Autenticar(string usuario, string contrasenna)
        {
            var retorno = repositorio.AutenticarUsuario(usuario, contrasenna);
            return retorno;
        }

        // GET api/values/values
        public IEnumerable<Usuario> Get()
        {
            //var usuarios = db.Usuarios.Include(u => u.Rol);
            var usuarios = repositorio.ObtenerTodos();
            return usuarios.ToList();
        }

        // GET api/values/5
        public Usuario Get(string usuario, string contrasenna)
        {
            //var usuario = db.Usuarios.FirstOrDefault(u => u.Contrasenna == id);
            //return usuario;
            var retorno = repositorio.AutenticarUsuario(usuario, contrasenna);
            return retorno;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
