using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq.Expressions;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class GenericWithIdSoftDeleteRepository<T> : GenericWithIdRepository<T>, IGenericWithIdSoftDeleteRepository<T> where T : EntityWithIdSoftDelete
    {
        public GenericWithIdSoftDeleteRepository(TTCloneContext context) : base(context)
        {
        }

        public override void Update(T entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(p => p.DeleteDate).IsModified = false;
        }

        public override async Task<bool> Exists(int id)
        {
            return await Exists(id, includeSoftRemoved: false);
        }

        public override async Task<T?> GetByIdAsync(int id)
        {
            return await GetByIdAsync(id, includeSoftRemoved: false);
        }

        public override Task<List<T>> GetAllAsync(bool tracked = true)
        {
            return GetAllAsync(tracked: tracked, includeSoftRemoved: false);
        }

        public override Task<List<T>> GetAllByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true)
        {
            return GetAllByFilterAsync(filter: filter, tracked: tracked, includeSoftRemoved: false);
        }

        public override Task<T?> GetByFilterAsync(Expression<Func<T, bool>>? filter = null, bool tracked = true)
        {
            return GetByFilterAsync(filter: filter, tracked: tracked, includeSoftRemoved: false);
        }

        public override Task<List<T>> GetByIdList(IEnumerable<int> ids, bool tracked = true)
        {
            return GetByIdList(ids, tracked: tracked, includeSoftRemoved: false);
        }

        public override IQueryable<T> GetByFilterQuery(Expression<Func<T, bool>>? filter = null, bool tracked = true)
        {
            return GetByFilterQuery(filter: filter, tracked: tracked, includeSoftRemoved: false);
        }

        public async Task<bool> Exists(int id, bool includeSoftRemoved = false)
        {
            IQueryable<T> query = GetByFilterQuery(e => e.Id == id, tracked: false, includeSoftRemoved: includeSoftRemoved);
            return await query.AnyAsync();
        }

        public async Task<List<T>> GetAllAsync(bool tracked = true, bool includeSoftRemoved = false)
        {
            IQueryable<T> query = GetByFilterQuery(null, tracked: tracked, includeSoftRemoved: includeSoftRemoved);
            return await query.ToListAsync();
        }

        public async Task<List<T>> GetAllByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true, bool includeSoftRemoved = false)
        {
            IQueryable<T> query = GetByFilterQuery(filter, tracked: tracked, includeSoftRemoved: includeSoftRemoved);
            return await query.ToListAsync();
        }

        public async Task<T?> GetByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true, bool includeSoftRemoved = false)
        {
            IQueryable<T> query = GetByFilterQuery(filter, tracked: tracked, includeSoftRemoved: includeSoftRemoved);
            return await query.FirstOrDefaultAsync();
        }

        public IQueryable<T> GetByFilterQuery(Expression<Func<T, bool>>? filter, bool tracked = true, bool includeSoftRemoved = false)
        {
            IQueryable<T> query = base.GetByFilterQuery(filter, tracked: tracked);
            if (!includeSoftRemoved) query = query.Where(t => t.DeleteDate == null);
            return query;
        }

        public async Task<T?> GetByIdAsync(int id, bool includeSoftRemoved = false)
        {
            IQueryable<T> query = _context.Set<T>();
            query = query.Where(t => t.Id == id);
            if (!includeSoftRemoved) query = query.Where(t => t.DeleteDate == null);
            return await query.FirstOrDefaultAsync();
        }

        public Task<List<T>> GetByIdList(IEnumerable<int> ids, bool tracked = true, bool includeSoftRemoved = false)
        {
            IQueryable<T> query = GetByIdListQuery(ids, tracked: tracked);
            if (!includeSoftRemoved) query = query.Where(t => t.DeleteDate == null);
            return base.GetByIdList(ids);
        }

        public void Recover(T entity)
        {
            entity.DeleteDate = null;
            _context.Attach(entity);
            _context.Entry(entity).Property(e => e.DeleteDate).IsModified = true;
        }

        public void SoftRemove(T entity)
        {
            _context.Attach(entity);
            entity.DeleteDate = DateTime.UtcNow;
        }
    }
}
