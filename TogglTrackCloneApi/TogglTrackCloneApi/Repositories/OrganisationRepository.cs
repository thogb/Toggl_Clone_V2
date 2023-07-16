using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class OrganisationRepository : BaseRepository, IOrganisationRepository
    {
        public OrganisationRepository(TTCloneContext context) : base(context)
        {
            
        }
        public void AddOrganisation(Organisation organisation)
        {
            _context.Organisations.Add(organisation);
        }
    }
}
