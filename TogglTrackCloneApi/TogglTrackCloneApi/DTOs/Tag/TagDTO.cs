using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.DTOs.Tag
{
    public class TagDTO
    {
        public int Id { get; set; }
        [Required]
        [StringLength(32, MinimumLength = 1)]
        public int Name { get; set; }
        [Required]
        public int WorkspaceId { get; set; }
    }
}
