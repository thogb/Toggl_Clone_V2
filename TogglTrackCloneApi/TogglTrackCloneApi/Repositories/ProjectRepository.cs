using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class ProjectRepository : GenericWithIdRepository<Project>, IProjectRepository
    {
        public ProjectRepository(TTCloneContext context) : base(context)
        {
        }

        public void Recover(Project project)
        {
            project.DeleteDate = null;
            _context.Attach(project);
            _context.Entry(project).Property(te => te.DeleteDate).IsModified = true;
        }

        public void SoftRemove(Project project)
        {
            _context.Attach(project);
            project.DeleteDate = DateTime.UtcNow;
        }

        public override void Update(Project entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(p => p.DeleteDate).IsModified = false;
            _context.Entry(entity).Property(p => p.WorkspaceId).IsModified = false;
        }

    }
}
