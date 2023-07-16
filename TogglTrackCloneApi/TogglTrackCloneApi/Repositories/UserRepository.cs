using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
  /*      private readonly TTCloneContext _context;*/

        public UserRepository(TTCloneContext context) : base(context)
        {
     /*       _context = context;*/
        }

        public void AddUser(User user)
        {
            _context.Users.Add(user);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            return user;
        }

        public async Task<User?> GetUserByUserId(int userId)
        {
            User? user = await _context.Users.FindAsync(userId);

            return user;
        }
    }
}
