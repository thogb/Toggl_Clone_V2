using TogglTrackCloneApi.DTOs.Organisation;

namespace TogglTrackCloneApi.Services.IServices
{
    public interface IOrganisationService
    {
        Task AddOrganisation(OrganisationAddDTO organisationAddDTO, int userId);
        Task CanUserAddOrganisation(int userId);
    }
}
