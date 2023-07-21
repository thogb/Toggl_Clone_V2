using System.ComponentModel.DataAnnotations;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.ValidationAttributes;

namespace TogglTrackCloneApi.DTOs.TimeEntry
{
    public class TimeEntryResponseDTO
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? StopDate { get; set; } = null;
        public int WorkspaceId { get; set; }
        public int? ProjectId { get; set; } = null;
        public IEnumerable<TagInTEResponseDTO> TagIds { get; set; } = new List<TagInTEResponseDTO>();
/*        public IEnumerable<string> Tags { get; set; } = new List<string>();*/

    }
}
