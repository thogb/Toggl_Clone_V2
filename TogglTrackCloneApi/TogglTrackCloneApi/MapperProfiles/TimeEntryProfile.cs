using AutoMapper;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.DTOs.TimeEntry;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.MapperProfiles
{
    public class TimeEntryProfile : Profile
    {
        public TimeEntryProfile()
        {
            this.CreateMap<TimeEntryDTO, TimeEntry>()
                .ForMember(te => te.Tags, o => o.Ignore())
                .ReverseMap()
                .ForMember(ted => ted.Tags, o => o.Ignore());
            this.CreateMap<TimeEntry, TimeEntryResponseDTO>();
               /* .AfterMap((te, ter) => ter.Tags = new List<TagInTEResponseDTO>());*//*te.Tags?
                        .Select(tag => new TagInTEResponseDTO { Id = tag.Id, Name = tag.Name })
                        ?? new List<TagInTEResponseDTO>());*/
            /*            this.CreateMap<TimeEntry, TimeEntryResponseDTO>()
                            .AfterMap((te, ter) => ter.Tags = te.Tags?
                                    .Select(tag => tag.Name )
                                    ?? new List<string>());*/
            /*            this.CreateMap<TimeEntryPatchDTO, TimeEntry>()
                            .ForMember(te => te.Tags, o => o.Ignore())
                            .ReverseMap()
                            .ForMember(tep => tep.Tags, o => o.Ignore());*/
        }
    }
}
