using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TogglTrackCloneApi.DTOs.Project;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/projects")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(
            IProjectService projectService
            )
        {
            this._projectService = projectService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ProjectResponseDTO>> AddProject([FromBody] ProjectDTO projectDTO)
        {
            int userId = ControllerHelper.GetUserId(User);
            return await _projectService.AddProject(projectDTO, userId);
        }
    }
}
