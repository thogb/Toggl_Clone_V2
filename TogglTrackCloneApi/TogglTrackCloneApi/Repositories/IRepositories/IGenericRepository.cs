using System.Linq.Expressions;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IGenericRepository<T> : IBaseRepository
    {
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Add(T entity);
        void Remove(T entity);
        void Update(T entity);
        Task<T?> GetByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true);
        Task<List<T>> GetAllByFilterAsync(Expression<Func<T, bool>> filter, bool tracked = true);
    }
}
