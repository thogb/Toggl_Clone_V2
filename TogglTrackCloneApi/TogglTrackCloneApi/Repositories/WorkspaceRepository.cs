using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class WorkspaceRepository : GenericWithIdRepository<Workspace>, IWorkspaceRepository
    {
        public WorkspaceRepository(TTCloneContext context) : base(context)
        {
        }
    }
}
