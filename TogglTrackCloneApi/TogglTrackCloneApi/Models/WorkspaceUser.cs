namespace TogglTrackCloneApi.Models
{
    public class WorkspaceUser
    {
        public int UserId { get; set; }
      /*  public User? User { get; set; }*/
        public int WorkspaceId { get; set; }
      /*  public Workspace? Workspace { get; set; }*/
        public DateTime JoinDate { get; set; }
    }
}
