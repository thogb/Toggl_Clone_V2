using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IOrganisationRepository : IBaseRepository
    {
        void AddOrganisation(Organisation organisation);
    }
}
