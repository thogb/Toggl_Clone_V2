using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class GenericWithIdRepository<T> : GenericRepository<T>, IGenericWIthIDRepository<T> where T : EntityWithId
    {
        public GenericWithIdRepository(TTCloneContext context) : base(context)
        {
        }

        public override void Update(T entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(e => e.CreationDate).IsModified = false;
        }

        public virtual async Task<bool> Exists(int id)
        {
            return await _context.Set<T>().AnyAsync(t => t.Id == id);
        }

        public virtual async Task<List<T>> GetByIdList(IEnumerable<int> ids, bool tracked = true)
        {
            return await GetByIdListQuery(ids, tracked: tracked).ToListAsync();
        }

        public IQueryable<T> GetByIdListQuery(IEnumerable<int> ids, bool tracked = true)
        {
            return GetByFilterQuery(t => ids.Contains(t.Id), tracked: tracked);
        }
    }
}
