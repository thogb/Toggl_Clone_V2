using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class Project : EntityWithId
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 4)]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(6, MinimumLength = 6)]
        public string Colour { get; set; } = "4caf50";
        /*public DateTime CreationDate { get; set; }*/
        /*public bool? IsDeleted { get; set; }*/
        public bool Private { get; set; } = true;
        public bool Active { get; set; } = true;
        public DateTime? DeleteDate { get; set; } = null;
        public int WorkspaceId { get; set; }
        public Workspace? Workspace { get; set; }
        public ICollection<TimeEntry>? TimeEntries { get; set; }
        /*public ICollection<User>? Users{ get; set; }*/
    }
}
