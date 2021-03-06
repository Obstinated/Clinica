﻿using AccesoDatos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AccesoDatos.Repositorio
{
    interface IUsuarioRepositorio : IRepositorio<Usuario>
    {
        Usuario AutenticarUsuario(String usuario, String contrasenna);
    }
}
