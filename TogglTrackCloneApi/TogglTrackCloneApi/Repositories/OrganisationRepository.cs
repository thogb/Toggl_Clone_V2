using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class OrganisationRepository : GenericWithIdRepository<Organisation>, IOrganisationRepository
    {
        public OrganisationRepository(TTCloneContext context) : base(context)
        {
            
        }
    }
}
