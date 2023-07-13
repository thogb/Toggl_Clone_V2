namespace TogglTrackCloneApi.Models
{
    public class OrganisationUser
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int OrganisationId { get; set; }
        public Organisation Organisation { get; set; }
        public DateTime JoinDate { get; set; }
    }
}
