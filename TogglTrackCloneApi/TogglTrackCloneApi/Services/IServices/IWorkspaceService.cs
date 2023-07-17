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
        Task ValidateUserCanEditTag(int workspaceId, int userId);
        Task ValidateTagInWorkSpace(int workspaceId, int userId);
        Task ValidateUserCanEditTimeEntry(int workspaceId, int userId);
    }
}
