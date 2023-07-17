using Microsoft.EntityFrameworkCore;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IGenericWIthIDRepository<T> : IGenericRepository<T>
    {
        Task<bool> Exists(int id);
        Task<List<T>> GetByIdList(IEnumerable<int> ids);
    }
}
