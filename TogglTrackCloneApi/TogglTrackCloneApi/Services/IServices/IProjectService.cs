using Microsoft.AspNetCore.JsonPatch;
using TogglTrackCloneApi.DTOs.Project;

namespace TogglTrackCloneApi.Services.IServices
{
    public interface IProjectService
    {
        Task<ProjectResponseDTO> AddProject(ProjectDTO projectDTO, int userId);
        Task<ProjectResponseDTO> UpdateProject(int projectId, ProjectDTO projectDTO, int userId);
        Task<ProjectResponseDTO> PatchProject(int projectId, JsonPatchDocument<ProjectDTO> request, int userId);
        Task<bool> SoftDeleteProject(int projectId, int workspaceId, int userId);
    }
}
