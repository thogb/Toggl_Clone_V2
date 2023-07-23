using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IGenericWIthIDRepository<T> : IGenericRepository<T>
    {
        Task<bool> Exists(int id);
        IQueryable<T> GetByIdListQuery(IEnumerable<int> ids, bool tracked = true);
        Task<List<T>> GetByIdList(IEnumerable<int> ids, bool tracked = true);
    }
}
