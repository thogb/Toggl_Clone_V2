using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/Workspaces")]
    [ApiController]
    public class WorkspaceController : ControllerBase
    {
        private readonly IWorkspaceService _workspaceService;

        public WorkspaceController(IWorkspaceService workspaceService)
        {
            this._workspaceService = workspaceService;
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
    }
}
