using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IUserRepository : IGenericWIthIDRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
    }
}
