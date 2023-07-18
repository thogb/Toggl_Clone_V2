using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Linq;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class WorkspaceRepository : GenericWithIdRepository<Workspace>, IWorkspaceRepository
    {
        public WorkspaceRepository(TTCloneContext context) : base(context)
        {
        }

        public async Task<ICollection<Tag>> GetTagsFromTagIdList(int workspaceId, IEnumerable<int> tagIdList)
        {
            var workspace = await _context.Workspaces
                .Where(w => w.Id == workspaceId)
                .Include(w => w.Tags
                    .Where(t => tagIdList.Contains(t.Id)))
                .FirstOrDefaultAsync();
            return workspace?.Tags ?? new List<Tag>();
        }

        public async Task<ICollection<Tag>> GetTagsFromTagNameList(int workspaceId, IEnumerable<string> tagNameList)
        {
            var workspace = await _context.Workspaces
                .Where(w => w.Id == workspaceId)
                        .Include(w => w.Tags
                    .Where(t => tagNameList.Contains(t.Name)))
                .FirstOrDefaultAsync();

            return workspace?.Tags ?? new List<Tag>();
        }
    }
}
