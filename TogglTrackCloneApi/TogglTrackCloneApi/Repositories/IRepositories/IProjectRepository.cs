using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IProjectRepository : IGenericWIthIDRepository<Project>
    {
        void SoftRemove(Project project);
        void Recover(Project project);
    }
}
