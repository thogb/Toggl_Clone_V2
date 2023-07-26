using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.DTOs.Project
{
    public class ProjectDTO
    {
        [Required]
        [StringLength(255, MinimumLength = 1, ErrorMessage = "project name must be between 1 and 255 characters long")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [StringLength(7, MinimumLength = 7)]
        [RegularExpression("^#[0-9a-fA-F]*", ErrorMessage = "incorrect hex colour format")]
        public string Colour { get; set; } = "4caf50";
        [Required]
        public bool Private { get; set; } = true;
        public bool Active { get; set; } = true;
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "invalid workspace id")]
        public int WorkspaceId { get; set; } = 0;
    }
}
