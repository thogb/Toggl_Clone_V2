using System.Linq.Expressions;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface ITimeEntryRepository : IGenericWIthIDRepository<TimeEntry>
    {
        Task<bool> IsTimeEntryInWorkspace(int timeEntryId, int workspaceId);
        void SoftRemove(TimeEntry timeEntry);
        void Recover(TimeEntry timeEntry);
        Task<List<TimeEntry>> GetAllByFiltersIncludeTagsAsync(Expression<Func<TimeEntry, bool>> filter, bool tracked = true);
        void UpdateDateInfo(TimeEntry timeEntry);
    }
}
