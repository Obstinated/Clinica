using Microsoft.VisualStudio.TestTools.UnitTesting;
using AccesoDatos.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Repositorio.Tests
{
    [TestClass()]
    public class CitaRepositorioTests
    {
        private ClinicaEntities repositorio = new ClinicaEntities();

        [TestMethod()]
        public void VerificarCitaTest_Vacio()
        {
            string valorEsperado = string.Empty;

            Cita cita = new Cita()
            {
                Id = 0,
                PacienteId = 24,
                Fecha = new DateTime(2040, 12, 31),
                TipoCitaId = 4
            };
            CitaRepositorio citaRepositorio = new CitaRepositorio(repositorio);
            string valorObtenido = citaRepositorio.VerificarCita(cita);

            Assert.AreEqual(valorEsperado, valorObtenido);
        }

        [TestMethod()]
        public void VerificarCitaTest_CitaRepetida()
        {
            string valorEsperado = "No se puede crear otra cita para el mismo paciente en el mismo día.";

            Cita cita = new Cita()
            {
                Id = 0,
                PacienteId = 153,
                Fecha = new DateTime(2019, 03, 14),
                TipoCitaId = 2
            };
            CitaRepositorio citaRepositorio = new CitaRepositorio(repositorio);
            string valorObtenido = citaRepositorio.VerificarCita(cita);

            Assert.AreEqual(valorEsperado, valorObtenido);
        }

        [TestMethod()]
        public void VerificarCitaTest_FechaIncorrecta()
        {
            string valorEsperado = "Las citas se deben agendar con mínimo 24 horas de antelación.";

            Cita cita = new Cita()
            {
                Id = 0,
                PacienteId = 24,
                Fecha = new DateTime(1980, 12, 31),
                TipoCitaId = 4
            };
            CitaRepositorio citaRepositorio = new CitaRepositorio(repositorio);
            string valorObtenido = citaRepositorio.VerificarCita(cita);

            Assert.AreEqual(valorEsperado, valorObtenido);
        }
    }
}