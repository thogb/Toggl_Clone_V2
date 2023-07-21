using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.Models
{
    public class Organisation : EntityWithId
    {
        public Organisation()
        {
            this.Workspaces = new List<Workspace>();
            this.Users = new List<User>();
        }

        public int Id { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Name { get; set; } = string.Empty;
        /*public DateTime CreationDate { get; set; }*/
        public ICollection<Workspace> Workspaces { get; set; }
        /*public ICollection<OrganisationUser>? OrganisationUsers { get; set; }*/
        public ICollection<User> Users{ get; set; }

    }
}
