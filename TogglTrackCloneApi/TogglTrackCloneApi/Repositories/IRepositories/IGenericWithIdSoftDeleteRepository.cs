using System.Linq.Expressions;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IGenericWithIdSoftDeleteRepository<T> : IGenericWIthIDRepository<T>
    {
        void SoftRemove(T entity);
        void Recover(T entity);
        Task<T?> GetByIdAsync(int id, bool includeSoftRemoved = false);
        Task<List<T>> GetAllAsync(bool tracked = true, bool includeSoftRemoved = false);
        IQueryable<T> GetByFilterQuery(Expression<Func<T, bool>>? filter, bool tracked = true, bool includeSoftRemoved = false);
        Task<T?> GetByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true, bool includeSoftRemoved = false);
        Task<List<T>> GetAllByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true, bool includeSoftRemoved = false);
        Task<bool> Exists(int id, bool includeSoftRemoved = false);
        Task<List<T>> GetByIdList(IEnumerable<int> ids, bool tracked = true, bool includeSoftRemoved = false);
    }
}
