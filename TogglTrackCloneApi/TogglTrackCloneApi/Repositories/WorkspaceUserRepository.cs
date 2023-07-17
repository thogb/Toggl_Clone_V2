using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class WorkspaceUserRepository : GenericRepository<WorkspaceUser>, IWorkspaceUserRepository
    {
        public WorkspaceUserRepository(TTCloneContext context) : base(context)
        {
        }

        public Task<WorkspaceUser> GetByUserId(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<WorkspaceUser> GetByWorkspaceId(int workspaceId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> RecordExistsAsync(int workspaceId, int userId)
        {
            return await _context.WorkspaceUser.AnyAsync(wu => wu.UserId == userId && wu.WorkspaceId == workspaceId);
        }
    }
}
