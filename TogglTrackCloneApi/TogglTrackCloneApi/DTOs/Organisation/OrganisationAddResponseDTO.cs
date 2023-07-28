using TogglTrackCloneApi.DTOs.Workspace;

namespace TogglTrackCloneApi.DTOs.Organisation
{
    public class OrganisationAddResponseDTO
    {
        /*        public int OrganisationId { get; set; }
                public string OrganisationName { get; set; }
                public int WorkspaceId { get; set; }
                public string WorkspaceName { get; set; }*/
        public OrganisatioResponseDTO Organisation { get; set; }
        public WorkspaceResponseDTO Workspace { get; set; }
    }
}
