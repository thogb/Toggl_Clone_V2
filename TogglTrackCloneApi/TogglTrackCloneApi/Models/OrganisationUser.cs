using System.ComponentModel.DataAnnotations.Schema;

namespace TogglTrackCloneApi.Models
{
    public class OrganisationUser : BaseEntity
    {
        public int UserId { get; set; }
/*        public User? User { get; set; }*/
        public int OrganisationId { get; set; }
        /*        public Organisation? Organisation { get; set; }*/
        [NotMapped]
        public DateTime JoinDate { get => CreationDate; set => CreationDate = value; }
    }
}
