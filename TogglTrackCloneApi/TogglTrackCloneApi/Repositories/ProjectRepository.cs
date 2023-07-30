using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class ProjectRepository : GenericWithIdSoftDeleteRepository<Project>, IProjectRepository
    {
        public ProjectRepository(TTCloneContext context) : base(context)
        {
        }

        public override void Update(Project entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(p => p.WorkspaceId).IsModified = false;
        }

        public async Task<bool> ProjectNameExists(string projectName, int workspaceId)
        {
            IQueryable<Project> query = GetByFilterQuery(p => p.Name == projectName && p.WorkspaceId == workspaceId, tracked: false, includeSoftRemoved: true);
            return await query.AnyAsync();
        }
    }
}
