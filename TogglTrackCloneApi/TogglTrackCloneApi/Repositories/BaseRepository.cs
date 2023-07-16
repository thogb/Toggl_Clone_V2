using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        protected readonly TTCloneContext _context;

        public BaseRepository(TTCloneContext context)
        {
            _context = context;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
