using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IOrganisationUsersRepository : IGenericRepository<OrganisationUser>
    {
        Task<int> GetUserRecordCount(int userId);
    }
}
