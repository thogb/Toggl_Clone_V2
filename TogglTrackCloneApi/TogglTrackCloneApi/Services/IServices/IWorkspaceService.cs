using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Services.IServices
{
    public interface IWorkspaceService
    {
        Task<Workspace> addWorkspace(WorkspaceAddDTO workspaceAddDTO);
    }
}
