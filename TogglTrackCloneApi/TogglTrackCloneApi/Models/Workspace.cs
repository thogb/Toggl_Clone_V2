using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class Workspace : EntityWithId
    {
        public Workspace()
        {
            this.Projects = new List<Project>();
            this.Tags = new List<Tag>();
            this.TimeEntries = new List<TimeEntry>();
            this.Users = new List<User>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(64, MinimumLength = 4)]
        public string Name { get; set; } = string.Empty;
        /*public DateTime CreationDate { get; set; }*/
        public ICollection<TimeEntry> TimeEntries { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<User> Users { get; set; }
        /*public ICollection<WorkspaceUser>? WorkspaceUsers { get; set; }*/
        [Required]
        public int OrganisationId { get; set; }
        public Organisation? Organisation { get; set; }
        public ICollection<Project> Projects { get; set; }
    }
}
