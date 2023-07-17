using System.ComponentModel.DataAnnotations.Schema;

namespace TogglTrackCloneApi.Models
{
    public class WorkspaceUser : BaseEntity
    {
        public int UserId { get; set; }
      /*  public User? User { get; set; }*/
        public int WorkspaceId { get; set; }
        /*  public Workspace? Workspace { get; set; }*/
        [NotMapped]
        public DateTime JoinDate { get => CreationDate; set => CreationDate = value; }
    }
}
