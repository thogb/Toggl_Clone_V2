using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class WorkspaceRepository : BaseRepository, IWorkspaceRepository
    {
        public WorkspaceRepository(TTCloneContext context) : base(context)
        {
        }

        public void addWorkspace(Workspace workspace)
        {
            _context.Workspaces.Add(workspace);
        }
    }
}
