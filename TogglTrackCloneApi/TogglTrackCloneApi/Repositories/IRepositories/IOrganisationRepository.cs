using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IOrganisationRepository : IGenericWIthIDRepository<Organisation>
    {
        Task<bool> OrganisationNameExists(string projectName);
    }
}
