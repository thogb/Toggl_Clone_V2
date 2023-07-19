using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class TimeEntryRepository : GenericWithIdRepository<TimeEntry>, ITimeEntryRepository
    {
        public TimeEntryRepository(TTCloneContext context) : base(context)
        {
        }

        public override void Update(TimeEntry entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(te => te.DeleteDate).IsModified = false;
            _context.Entry(entity).Property(te => te.WorkspaceId).IsModified = false;
            _context.Entry(entity).Property(te => te.UserId).IsModified = false;
            UpdateDateInfo(entity);
        }

        public override void Add(TimeEntry entity)
        {
            UpdateDateInfo(entity);
            base.Add(entity);
        }

        public async Task<List<TimeEntry>> GetAllByFiltersIncludeTagsAsync(Expression<Func<TimeEntry, bool>>? filter = null, bool tracked = true)
        {
            IQueryable<TimeEntry> query = _context.TimeEntries;
            if (!tracked) query = query.AsNoTracking();
            if (filter != null) query = query.Where(filter);
            return await query.Include(t => t.Tags).ToListAsync();
        }

        public async Task<bool> IsTimeEntryInWorkspace(int timeEntryId, int workspaceId)
        {
            return await _context.TimeEntries.AnyAsync(te => te.Id == timeEntryId && te.WorkspaceId == workspaceId && te.DeleteDate == null);
        }

        // Assumed it is tracked, usually retrieve with find first then remove
        public void SoftRemove(TimeEntry timeEntry)
        {
            _context.Attach(timeEntry);
            timeEntry.DeleteDate = DateTime.UtcNow;
        }

        public void Recover(TimeEntry timeEntry)
        {
            timeEntry.DeleteDate = null;
            _context.Attach(timeEntry);
            _context.Entry(timeEntry).Property(te => te.DeleteDate).IsModified = true;
        }

        private void UpdateDateInfo(TimeEntry timeEntry)
        {
            if (timeEntry.Duration >= 0)
            {
                timeEntry.StopDate = timeEntry.StartDate.AddSeconds(timeEntry.Duration);
            }
        }
    }
}
