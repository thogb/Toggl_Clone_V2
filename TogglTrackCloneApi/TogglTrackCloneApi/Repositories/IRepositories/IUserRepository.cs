using System.Linq.Expressions;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IUserRepository : IGenericWIthIDRepository<User>
    {
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByFilterIncludeAsync(
            Expression<Func<User, bool>>? filter = null, 
            bool track = false, 
            bool includeOrganisation = false, 
            bool includeWorkspace = false, 
            bool includeProjects = false, 
            bool includeTags = false, 
            bool includeTimeEntries = false);
    }
}
