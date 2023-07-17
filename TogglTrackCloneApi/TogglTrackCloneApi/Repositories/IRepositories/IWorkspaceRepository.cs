using System.Collections;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IWorkspaceRepository : IGenericWIthIDRepository<Workspace>
    {
        Task<ICollection<Tag>> GetTagsFromTagIdList(int workspaceId, IEnumerable<int> tagIdList);
    }
}
