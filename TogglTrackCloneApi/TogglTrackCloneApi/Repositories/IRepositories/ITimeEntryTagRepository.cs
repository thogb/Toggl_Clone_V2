using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface ITimeEntryTagRepository : IGenericRepository<TimeEntryTag>
    {
        void DeleteByTimeEntryId(int timeEntryId);
    }
}
