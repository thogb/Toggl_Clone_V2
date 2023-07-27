using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class UserRepository : GenericWithIdRepository<User>, IUserRepository
    {

        public UserRepository(TTCloneContext context) : base(context)
        {
        }

        public override void Update(User entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(u => u.PasswordHash).IsModified = false;
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            return user;
        }

        public async Task<User?> GetByFilterIncludeAsync(
            Expression<Func<User, bool>>? filter = null, 
            bool track = false, 
            bool includeOrganisation = false, 
            bool includeWorkspace = false,
            bool includeProjects = false, 
            bool includeTags = false, 
            bool includeTimeEntries = false
            )
        {
            IQueryable<User> query = _context.Users;
            if (!track) query = query.AsNoTracking();
            if (filter != null) query = query.Where(filter);
            if (includeOrganisation) query = query.Include(u => u.Organisations);
            if (includeWorkspace) query = query.Include(u => u.Workspaces);
            if (includeProjects) query = query.Include(u => u.Projects);
            if (includeTags) query = query.Include(u => u.Tags);
            if (includeTimeEntries) query = query.Include(u => u.TimeEntries);
            return await query.FirstOrDefaultAsync();
        }
    }
}
