using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class Workspace
    {
        public int WorkspaceId { get; set; }
        [Required]
        [StringLength(64, MinimumLength = 4)]
        public string Name { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public ICollection<TimeEntry>? TimeEntries { get; set; }
        public ICollection<Tag>? Tags { get; set; }
        public ICollection<WorkspaceUser> WorkspaceUsers { get; set; }
        [Required]
        public int OrganisationId { get; set; }
        public Organisation? Organisation { get; set; }
        public ICollection<Project>? Projects { get; set; }
    }
}
