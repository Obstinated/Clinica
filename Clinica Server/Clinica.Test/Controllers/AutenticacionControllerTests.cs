using Microsoft.VisualStudio.TestTools.UnitTesting;
using Clinica.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AccesoDatos;

namespace Clinica.Controllers.Tests
{
    [TestClass()]
    public class AutenticacionControllerTests
    {
        [TestMethod()]
        public void AutenticarTest_Exitoso()
        {
            AccesoDatos.Usuario valorEsperado = new Usuario()
            {
                Id = 100,
                Usuario1 = "Mullins",
                Contrasenna = "100",
                RolId = 2,
                Rol = null
            };

            string usuario = "Mullins";
            string contrasenna = "100";
            AutenticacionController controller = new AutenticacionController();
            AccesoDatos.Usuario valorObtenido = controller.Autenticar(usuario, contrasenna);

            Assert.AreEqual(valorEsperado.Id, valorObtenido.Id);
        }

        [TestMethod()]
        public void AutenticarTest_Fallido()
        {
            Usuario valorEsperado = null;

            string usuario = "Mullins2";
            string contrasenna = "101";
            AutenticacionController controller = new AutenticacionController();
            Usuario valorObtenido = controller.Autenticar(usuario, contrasenna);

            Assert.AreEqual(valorEsperado, valorObtenido);
        }
        
    }
}