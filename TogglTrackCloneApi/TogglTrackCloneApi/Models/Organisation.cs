using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class Organisation
    {
        public int OrganisationId { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Name { get; set; } = string.Empty;
        public DateTime CreationDate { get; set; }
        public ICollection<Workspace>? Workspaces { get; set; }
        public ICollection<OrganisationUser> OrganisationUsers { get; set; }

    }
}
