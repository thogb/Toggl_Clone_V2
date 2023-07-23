using System.Linq.Expressions;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface ITimeEntryRepository : IGenericWithIdSoftDeleteRepository<TimeEntry>
    {
        Task<bool> IsTimeEntryInWorkspace(int timeEntryId, int workspaceId);
        void SoftRemove(TimeEntry timeEntry);
        void Recover(TimeEntry timeEntry);
        Task<List<TimeEntry>> GetAllByFiltersIncludeTagsAsync(Expression<Func<TimeEntry, bool>> filter, bool tracked = true, bool includeSoftRemoved = false);
        void UpdateDateInfo(TimeEntry timeEntry);
    }
}
