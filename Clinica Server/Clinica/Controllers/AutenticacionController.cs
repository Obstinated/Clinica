using AccesoDatos;
using AccesoDatos.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Clinica.Controllers
{
    public class AutenticacionController : ApiController
    {
        private UsuarioRepositorio repositorio = new UsuarioRepositorio(new ClinicaEntities());

        // GET: api/Autenticacion/Autenticar
        [HttpGet]
        public Usuario Autenticar(string usuario, string contrasenna)
        {
            var retorno = repositorio.AutenticarUsuario(usuario, contrasenna);
            return retorno;
        }

    }
}
