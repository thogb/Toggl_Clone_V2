using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IProjectRepository : IGenericWithIdSoftDeleteRepository<Project>
    {
        Task<bool> ProjectNameExists(string projectName, int workspaceId);
    }
}
