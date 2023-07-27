using TogglTrackCloneApi.DTOs.Organisation;
using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Services.IServices
{
    public interface IUserServices
    {
        Task<List<Organisation>> GetOrganisations(int userId);
        Task<List<Workspace>> GetWorkspaces(int userId);
        Task<List<Tag>> GetWorkingTags(int userId);
        Task<List<TimeEntry>> GetTimeEntries(int userId);
        Task<List<Project>> GetWorkingProjects(int userId);
    }
}
