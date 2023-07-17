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

        public async Task<bool> Exists(int id)
        {
            return await _context.Set<T>().AnyAsync(t => t.Id == id);
        }
    }
}
