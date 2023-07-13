using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class TimeEntry
    {
        public int TimeEntryId { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 0)]
        public string Description { get; set; } = string.Empty;
        [Required]
        public int Duration { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime? StopDate { get; set; }
        public bool? IsDeleted { get; set; }
        [Required]
        public int WorkspaceId { get; set; }
        public Workspace? Workspace { get; set; }
        public int? ProjectId { get; set; }
        public Project? Project { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
        /*public ICollection<Tag>? Tags { get; set; }*/
        public ICollection<TimeEntryTag> TimeEntryTags { get; set; }
    }
}
