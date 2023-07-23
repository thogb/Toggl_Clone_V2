namespace TogglTrackCloneApi.Models
{
    public class EntityWithIdSoftDelete : EntityWithId
    {
        public DateTime? DeleteDate { get; set; } = null;
    }
}
