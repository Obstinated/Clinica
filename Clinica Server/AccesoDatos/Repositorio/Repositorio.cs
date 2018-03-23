using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace AccesoDatos.Repositorio
{
    public class Repositorio<TEntidad> : IRepositorio<TEntidad> where TEntidad : class
    {
        protected readonly DbContext Context;

        public Repositorio(DbContext context)
        {
            Context = context;
        }

        public TEntidad Obtener(int id)
        {
            return Context.Set<TEntidad>().Find(id);
        }

        public IEnumerable<TEntidad> ObtenerTodos()
        {
            return Context.Set<TEntidad>().ToList();
        }

        public IEnumerable<TEntidad> Buscar(Expression<Func<TEntidad, bool>> condiciones)
        {
            return Context.Set<TEntidad>().Where(condiciones);
        }

        public TEntidad BuscarElPrimero(Expression<Func<TEntidad, bool>> condiciones)
        {
            return Context.Set<TEntidad>().SingleOrDefault(condiciones);
        }

        public void Agregar(TEntidad Entidad)
        {
            Context.Set<TEntidad>().Add(Entidad);
        }

        public void AgregarVarios(IEnumerable<TEntidad> entidades)
        {
            Context.Set<TEntidad>().AddRange(entidades);
        }

        public void Eliminar(TEntidad Entidad)
        {
            Context.Set<TEntidad>().Remove(Entidad);
        }

        public void EliminarVarios(IEnumerable<TEntidad> entidades)
        {
            Context.Set<TEntidad>().RemoveRange(entidades);
        }

        public int Guardar()
        {
            return Context.SaveChanges();
        }
    }
}