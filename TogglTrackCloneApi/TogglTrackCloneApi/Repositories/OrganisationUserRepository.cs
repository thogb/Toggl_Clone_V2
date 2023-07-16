using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class OrganisationUserRepository : BaseRepository, IOrganisationUsersRepository
    {
        public OrganisationUserRepository(TTCloneContext context) : base(context)
        {
        }

        public Task<int> GetUserRecordCount(int userId)
        {
            return _context.OrganisationUser.AsNoTracking().Where(i => i.UserId == userId).CountAsync();
        }
    }
}
