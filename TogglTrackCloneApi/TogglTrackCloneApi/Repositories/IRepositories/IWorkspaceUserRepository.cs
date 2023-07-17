using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IWorkspaceUserRepository : IGenericRepository<WorkspaceUser>
    {
        Task<bool> RecordExistsAsync(int workspaceId, int userId);
        Task<WorkspaceUser> GetByUserId(int userId);
        Task<WorkspaceUser> GetByWorkspaceId(int workspaceId);
    }
}
