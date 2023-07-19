using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.DTOs.Organisation
{
    public class OrganisationAddDTO
    {
        [Required]
        [StringLength(255, MinimumLength = 1)]
        public string Name { get; set; }
        public string? WorkspaceName { get; set; }
    }
}
