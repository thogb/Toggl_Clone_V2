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
            this.CreateMap<TimeEntryDTO, TimeEntry>();
            this.CreateMap<TimeEntry, TimeEntryResponseDTO>()
                .AfterMap((te, ter) => ter.TagIds = te.Tags?
                        .Select(tag => new TagInTEResponseDTO { Id = tag.Id, Name = tag.Name}) 
                        ?? new List<TagInTEResponseDTO>());
        }
    }
}
