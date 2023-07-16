using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(46)]
        public string Name { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        /*public DateTime CreationDate { get; set; }*/
        public ICollection<TimeEntry>? TimeEntries { get; set; }
        public ICollection<Tag>? Tags { get; set; }
        /*public ICollection<OrganisationUser>? OrganisationUsers { get; set; }*/
        public ICollection<Organisation>? Organisations { get; set; }
        public ICollection<Project>? Projects { get; set; }
        public ICollection<Workspace>? Workspaces { get; set; }
        /* public ICollection<WorkspaceUser>? WorkspaceUsers { get; set; }*/
    }
}
