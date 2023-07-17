using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface ITimeEntryRepository : IGenericWIthIDRepository<TimeEntry>
    {
        Task<bool> IsTimeEntryInWorkspace(int timeEntryId, int workspaceId);
        void SoftRemove(TimeEntry timeEntry);
        void UnDelete(TimeEntry timeEntry);
    }
}
