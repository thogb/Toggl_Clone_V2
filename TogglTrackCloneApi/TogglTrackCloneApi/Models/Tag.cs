using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class Tag : EntityWithId
    {
        public Tag()
        {
            this.TimeEntries = new List<TimeEntry>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(32, MinimumLength = 1)]
        public string Name { get; set; } = string.Empty;
        /*public DateTime CreationDate { get; set; }*/
        public int? UserId { get; set; } // Restrict delete of User
        public User? User { get; set; }
        public ICollection<TimeEntry> TimeEntries { get; set; }
        /*public ICollection<TimeEntryTag> TimeEntryTags { get; set; }*/
        [Required]
        public int WorkspaceId { get; set; }
        public Workspace? Workspace { get; set; }
    }
}
