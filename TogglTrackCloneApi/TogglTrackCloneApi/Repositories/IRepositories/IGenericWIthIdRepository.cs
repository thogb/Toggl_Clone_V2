using Microsoft.EntityFrameworkCore;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IGenericWIthIDRepository<T> : IGenericRepository<T>
    {
        Task<bool> Exists(int id);
    }
}
