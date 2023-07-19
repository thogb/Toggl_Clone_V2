using Microsoft.EntityFrameworkCore;
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
    }
}
