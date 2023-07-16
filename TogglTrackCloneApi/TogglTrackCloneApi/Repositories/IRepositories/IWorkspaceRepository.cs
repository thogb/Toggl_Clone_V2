using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IWorkspaceRepository : IBaseRepository
    {
        void addWorkspace(Workspace workspace);
    }
}
