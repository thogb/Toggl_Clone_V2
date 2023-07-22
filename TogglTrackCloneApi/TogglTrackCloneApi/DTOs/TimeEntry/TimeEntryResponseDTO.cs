using System.ComponentModel.DataAnnotations;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.ValidationAttributes;

namespace TogglTrackCloneApi.DTOs.TimeEntry
{
    public class TimeEntryResponseDTO
    {
        private DateTime _startDate;
        private DateTime? _stopDate = null;

        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Duration { get; set; }
        public DateTime StartDate { 
            get => DateTime.SpecifyKind(this._startDate, DateTimeKind.Utc); 
            set => this._startDate = value; 
        }
        public DateTime? StopDate { 
            get => this._stopDate == null ? null : DateTime.SpecifyKind(this._stopDate ?? DateTime.Now, DateTimeKind.Utc); 
            set => this._stopDate = value; 
        }
        public int WorkspaceId { get; set; }
        public int? ProjectId { get; set; } = null;
        public IEnumerable<TagInTEResponseDTO> Tags { get; set; } = new List<TagInTEResponseDTO>();
/*        public IEnumerable<string> Tags { get; set; } = new List<string>();*/

    }
}
