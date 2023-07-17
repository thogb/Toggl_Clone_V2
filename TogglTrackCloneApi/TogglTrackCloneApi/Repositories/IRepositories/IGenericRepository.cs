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
    }
}
