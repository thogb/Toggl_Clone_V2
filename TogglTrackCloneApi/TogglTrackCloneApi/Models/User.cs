using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class User : EntityWithId
    {
        public User()
        {
            this.Tags = new List<Tag>();
            this.Organisations = new List<Organisation>();
            this.Workspaces = new List<Workspace>();
            this.Projects = new List<Project>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        [Required]
        [StringLength(46)]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        /*public DateTime CreationDate { get; set; }*/
        public ICollection<TimeEntry> TimeEntries { get; set; }
        public ICollection<Tag> Tags { get; set; }
        /*public ICollection<OrganisationUser>? OrganisationUsers { get; set; }*/
        public ICollection<Organisation> Organisations { get; set; }
        public ICollection<Project> Projects { get; set; }
        public ICollection<Workspace> Workspaces { get; set; }
        /* public ICollection<WorkspaceUser>? WorkspaceUsers { get; set; }*/
    }
}
