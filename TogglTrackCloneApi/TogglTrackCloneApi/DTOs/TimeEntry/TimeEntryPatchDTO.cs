using System.ComponentModel.DataAnnotations;
using TogglTrackCloneApi.ValidationAttributes;

namespace TogglTrackCloneApi.DTOs.TimeEntry
{
    public class TimeEntryPatchDTO
    {
        [Required]
        [StringLength(255, MinimumLength = 0, ErrorMessage = "description must be between 0 and 255 characters long")]
        public string Description { get; set; } = string.Empty;
        [Required]
        public DateTime StartDate { get; set; }
        public DateTime StopDate { get; set; }
        [Range(0, int.MaxValue)]
        public int Duration { get; set; }
        public int? ProjectId { get; set; } = null;
        [Required]
        [ValidateIdList(ErrorMessage = "Tag id list is invalid")]
        public ICollection<string>? Tags { get; set; } = null;
        public DateTime? DeleteDate { get; set; }

    }
}
