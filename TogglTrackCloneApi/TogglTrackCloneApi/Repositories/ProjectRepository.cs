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

    }
}
