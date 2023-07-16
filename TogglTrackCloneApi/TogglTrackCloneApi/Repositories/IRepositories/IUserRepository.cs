using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IUserRepository : IBaseRepository
    {
        void AddUser(User user);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByUserId(int userId);
    }
}
