using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class TimeEntryTagRepository : GenericRepository<TimeEntryTag>, ITimeEntryTagRepository
    {
        public TimeEntryTagRepository(TTCloneContext context) : base(context)
        {
        }

        public void DeleteByTimeEntryId(int timeEntryId)
        {
            _context.TimeEntryTag.RemoveRange(_context.TimeEntryTag.Where(te => te.TimeEntryId == timeEntryId));
        }
    }
}
