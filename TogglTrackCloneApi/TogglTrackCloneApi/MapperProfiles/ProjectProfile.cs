using AutoMapper;
using TogglTrackCloneApi.DTOs.Project;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.MapperProfiles
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            this.CreateMap<ProjectDTO, Project>()
                .ForMember(p => p.Colour, o => o.MapFrom(pDTO => pDTO.Colour.Remove(0, 1)))
                .ReverseMap()
                .ForMember(pDTO => pDTO.Colour, o => o.MapFrom(p => $"#{p.Colour}"));
            this.CreateMap<Project, ProjectResponseDTO>()
                .ForMember(prDTO => prDTO.Colour, o => o.MapFrom(p => $"#{p.Colour}"));
        }
    }
}
