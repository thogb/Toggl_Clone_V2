using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.DTOs.Workspace
{
    public class WorkspaceAddDTO
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int OrganisationId { get; set; }
    }
}
