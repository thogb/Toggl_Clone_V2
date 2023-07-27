using AutoMapper;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Mappers
{
    public class TagProfile : Profile
    {
        public TagProfile()
        {
            this.CreateMap<TagDTO, Tag>();
            this.CreateMap<Tag, TagResponseDTO>();
            this.CreateMap<Tag, TagInTEResponseDTO>();
        }
    }
}
 