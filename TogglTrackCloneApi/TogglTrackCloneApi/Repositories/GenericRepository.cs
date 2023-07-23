using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq.Expressions;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class GenericRepository<T> : BaseRepository, IGenericRepository<T> where T : class
    {
        public GenericRepository(TTCloneContext context) : base(context)
        {
        }

        public virtual async Task AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
        }

        public virtual void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public virtual async Task<List<T>> GetAllAsync(bool tracked = true)
        {
            return await GetByFilterQuery(null, tracked: tracked).ToListAsync();
        }

        public virtual async Task<List<T>> GetAllByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true)
        {
            IQueryable<T> query = GetByFilterQuery(filter, tracked: tracked);
            return await query.ToListAsync();
        }

        public virtual async Task<T?> GetByFilterAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true)
        {
            IQueryable<T> query = GetByFilterQuery(filter, tracked: tracked);
            return await query.FirstOrDefaultAsync();
        }

        public virtual async Task<T?> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public virtual void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public virtual void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public virtual IQueryable<T> GetByFilterQuery(Expression<Func<T, bool>>? filter, bool tracked = true)
        {
            IQueryable<T> query = _context.Set<T>();
            if (!tracked) query = query.AsNoTracking();
            if (filter != null) query = query.Where(filter);
            return query;
        }
    }
}
