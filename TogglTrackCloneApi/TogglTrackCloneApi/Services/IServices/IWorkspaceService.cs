using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Services.IServices
{
    public interface IWorkspaceService
    {
        Task<TagResponseDTO> AddTagAsync(int workspaceId, int userId, TagDTO tagDTO);
        Task<TagResponseDTO> UpdateTagAsync(int workspaceId, int userId, int tagId, TagDTO tagDTO);
        Task<bool> DeleteTagAsync(int workspaceId, int userId, int tagId);
        Task<bool> CanUserEditTag(int workspaceId, int userId);
        Task<bool> IsTagInWorkspace(int workspaceId, int userId);
        /*Task<bool> IsTimeEntryInWorkspace(int workspaceId, int timeEntryId);*/
        Task<bool> IsUserInWorkspace(int workspaceId, int userId);
        Task<bool> CanUserEditTimeEntry(int workspaceId, int userId);
        Task ValidateWorkspaceAndUserCanEditTimeEntry(int workspaceId, int userId);
    }
}
