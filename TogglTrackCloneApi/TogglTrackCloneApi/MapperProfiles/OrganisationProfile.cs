using AutoMapper;
using TogglTrackCloneApi.DTOs.Organisation;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.MapperProfiles
{
    public class OrganisationProfile : Profile
    {
        public OrganisationProfile() {
            this.CreateMap<OrganisationAddDTO, Organisation>();
            this.CreateMap<Organisation, OrganisatioResponseDTO>();
        }
    }
}
