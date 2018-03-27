using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace AccesoDatos.Repositorio
{
    public interface IRepositorio<TEntidad> where TEntidad : class
    {
        TEntidad Obtener(int id);
        IEnumerable<TEntidad> ObtenerTodos();
        IEnumerable<TEntidad> Buscar(Expression<Func<TEntidad, bool>> condiciones);

        TEntidad BuscarElPrimero(Expression<Func<TEntidad, bool>> condiciones);

        void Agregar(TEntidad entidad);
        void AgregarVarios(IEnumerable<TEntidad> entidades);

        void Eliminar(TEntidad entidad);
        void EliminarVarios(IEnumerable<TEntidad> entidades);

        void Editar(TEntidad entidad);

        int Guardar();
    }
}