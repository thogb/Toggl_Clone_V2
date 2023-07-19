using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using TogglTrackCloneApi.DTOs.Project;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/Workspaces")]
    [ApiController]
    public class WorkspaceController : ControllerBase
    {
        private readonly IWorkspaceService _workspaceService;
        private readonly IProjectService _projectService;
        private readonly IMapper _mapper;

        public WorkspaceController(
            IWorkspaceService workspaceService, 
            IProjectService projectService,
            IMapper mapper
            )
        {
            this._workspaceService = workspaceService;
            this._projectService = projectService;
            this._mapper = mapper;
        }

        // #Tags
        [Authorize]
        [HttpPost("{wId}/Tags")]
        public async Task<ActionResult<TagResponseDTO>> AddTag(int wId, [FromBody] TagDTO tagDTO)
        {
            int userId = ControllerHelper.GetUserId(User);
            return Ok(await _workspaceService.AddTagAsync(wId, userId, tagDTO));
        }

        [Authorize]
        [HttpPut("{wId}/Tags/{tagId}")]
        public async Task<ActionResult<TagResponseDTO>> EditTag(int wId, int tagId, [FromBody] TagDTO tagDTO)
        {
            int userId = ControllerHelper.GetUserId(User);
            return Ok(await _workspaceService.UpdateTagAsync(wId, userId, tagId, tagDTO));
        }

        [Authorize]
        [HttpDelete("{wId}/Tags/{tagId}")]
        public async Task<ActionResult> RemoveTag(int wId, int tagId)
        {
            int userId = ControllerHelper.GetUserId(User);
            await _workspaceService.DeleteTagAsync(wId, userId, tagId);
            return Ok();
        }

        // #project
        [Authorize]
        [HttpPost("{wId}/Projects")]
        public async Task<ActionResult<ProjectResponseDTO>> AddProject(int wId, [FromBody] ProjectDTO projectDTO)
        {
            if (wId != projectDTO.WorkspaceId) return BadRequest();

            int userId = ControllerHelper.GetUserId(User);
            ProjectResponseDTO response = await _projectService.AddProject(projectDTO, userId);
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("{wId}/Projects/{pId}")]
        public async Task<ActionResult> RemoveProject(int wId, int pId)
        {
            int userId = ControllerHelper.GetUserId(User);
            await _projectService.SoftDeleteProject(pId, wId, userId);
            return NoContent();
        }

        [Authorize]
        [HttpPatch("{wId}/Projects/{pId}")]
        public async Task<ActionResult<ProjectResponseDTO>> PatchProject(int wId, int pId, [FromBody] JsonPatchDocument<ProjectDTO> request)
        {
            ProjectDTO projectDTO = new();
            request.ApplyTo(projectDTO, ModelState);

            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (wId != projectDTO.WorkspaceId) return BadRequest("incosistent workspace id");

            int userId = ControllerHelper.GetUserId(User);

            ProjectResponseDTO response = await _projectService.PatchProject(pId, request, userId);
            return Ok(response);
        }
    }
}
