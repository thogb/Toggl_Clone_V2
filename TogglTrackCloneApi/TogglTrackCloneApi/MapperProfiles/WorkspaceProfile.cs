using AutoMapper;
using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.MapperProfiles
{
    public class WorkspaceProfile : Profile
    {
        public WorkspaceProfile()
        {
            this.CreateMap<WorkspaceAddDTO, Workspace>(); ;
        }
    }
}
