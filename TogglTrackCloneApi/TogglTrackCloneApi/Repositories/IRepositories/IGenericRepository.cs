using System.Linq.Expressions;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IGenericRepository<T> : IBaseRepository
    {
        Task<T?> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync(bool tracked = true);
        Task AddAsync(T entity);
        void Add(T entity);
        void Remove(T entity);
        void Update(T entity);
        IQueryable<T> GetByFilterQuery(Expression<Func<T, bool>>? filter, bool tracked = true);
        Task<T?> GetByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true);
        Task<List<T>> GetAllByFilterAsync(Expression<Func<T, bool>>? filter, bool tracked = true);
    }
}
