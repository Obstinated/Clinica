﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;

namespace Clinica.DataAccess.Repositorio
{
    public class UsuarioRepositorio : Repositorio<Usuario>, IUsuarioRepositorio
    {
        public UsuarioRepositorio(ClinicaEntities context) : base(context)
        {
        }

        public ClinicaEntities ClinicaEntities
        {
            get { return Context as ClinicaEntities; }
        }

        public Usuario AutenticarUsuario(string usuario, string contrasenna)
        {
            return ClinicaEntities.Usuarios.SingleOrDefault(u => u.Usuario1 == usuario && u.Contrasenna == contrasenna);
        }
    }
}