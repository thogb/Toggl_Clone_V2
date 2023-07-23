using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class TimeEntryRepository : GenericWithIdSoftDeleteRepository<TimeEntry>, ITimeEntryRepository
    {
        public TimeEntryRepository(TTCloneContext context) : base(context)
        {
        }

        public override void Update(TimeEntry entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(te => te.WorkspaceId).IsModified = false;
            _context.Entry(entity).Property(te => te.UserId).IsModified = false;
            UpdateDateInfo(entity);
        }

        public override void Add(TimeEntry entity)
        {
            UpdateDateInfo(entity);
            base.Add(entity);
        }

        public async Task<List<TimeEntry>> GetAllByFiltersIncludeTagsAsync(Expression<Func<TimeEntry, bool>>? filter = null, bool tracked = true, bool includeSoftRemoved = false)
        {
            IQueryable<TimeEntry> query =  GetByFilterQuery(filter: filter, tracked: tracked, includeSoftRemoved: includeSoftRemoved);
            return await query.Include(t => t.Tags).ToListAsync();
        }

        public async Task<bool> IsTimeEntryInWorkspace(int timeEntryId, int workspaceId)
        {
            return await _context.TimeEntries.AnyAsync(te => te.Id == timeEntryId && te.WorkspaceId == workspaceId && te.DeleteDate == null);
        }

        public void UpdateDateInfo(TimeEntry timeEntry)
        {
            if (timeEntry.Duration >= 0)
            {
                timeEntry.StopDate = timeEntry.StartDate.AddSeconds(timeEntry.Duration);
            }
        }
    }
}
