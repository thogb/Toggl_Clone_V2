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

        public async Task<User?> GetByEmailAsync(string email)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            return user;
        }
    }
}
