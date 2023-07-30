using Microsoft.EntityFrameworkCore;
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

        public async Task<bool> OrganisationNameExists(string projectName)
        {
            IQueryable<Organisation> query = GetByFilterQuery(o => o.Name == projectName, tracked: false);
            return await query.AnyAsync();
        }
    }
}
