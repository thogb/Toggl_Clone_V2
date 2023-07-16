using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Services
{
    public class WorkspaceService : IWorkspaceService
    {
        private readonly IWorkspaceRepository _workspaceRepository;

        public WorkspaceService(IWorkspaceRepository workspaceRepository)
        {
            this._workspaceRepository = workspaceRepository;
        }
        public Task<Workspace> addWorkspace(WorkspaceAddDTO workspaceAddDTO)
        {
            throw new NotImplementedException();
        }
    }
}
