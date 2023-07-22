using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.DTOs.BatchResponse;
using TogglTrackCloneApi.DTOs.TimeEntry;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.ModelBinders;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/time_entries")]
    [ApiController]
    public class TimeEntryController : ControllerBase
    {
        private readonly ITimeEntryService _timeEntryService;
        private readonly TTCloneContext tTCloneContext;
        private readonly ILogger _logger;

        public TimeEntryController(
            ITimeEntryService timeEntryService, 
            TTCloneContext tTCloneContext,
            ILogger<TimeEntryController> logger)
        {
            this._timeEntryService = timeEntryService;
            this.tTCloneContext = tTCloneContext;
            this._logger = logger;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TimeEntryResponseDTO>> AddTimeEntry([FromBody] TimeEntryDTO timeEntryDTO)
        {
            int userId = ControllerHelper.GetUserId(User);
            var response = await _timeEntryService.AddTimeEntry(timeEntryDTO, userId);
            return Ok(response);
        }

        [Authorize]
        [HttpPut("{tId}")]
        public async Task<ActionResult<TimeEntryResponseDTO>> UpdateTimeEntry(int tId, [FromBody] TimeEntryDTO timeEntryDTO)
        {
            int userId = ControllerHelper.GetUserId(User);
            var response = await _timeEntryService.UpdateTimeEntry(tId, timeEntryDTO, userId);
            return Ok(response);
        }


        [Authorize]
        [HttpDelete("{tId}")]
        public async Task<ActionResult> DeleteTimeEntry(int tId)
        {
            int userId = ControllerHelper.GetUserId(User);
            await _timeEntryService.SoftRemoveTimeEntryAsync(tId, userId);
            return NoContent();
        }

        [Authorize]
        [HttpPatch("recover/{tId}")]
        public async Task<ActionResult> RecoverTimeEntry(int tId)
        {
            int userId = ControllerHelper.GetUserId(User);
            await _timeEntryService.RecoverTimeEntryAsync(tId, userId);
            return Ok();
        }

        [Authorize]
        [HttpPatch("{tId:int}")]
        public async Task<ActionResult<TimeEntryResponseDTO>> PatchTimeEntry(int tId, [FromBody] JsonPatchDocument<TimeEntryPatchDTO> request)
        {
            int userId = ControllerHelper.GetUserId(User);
            TimeEntryPatchDTO timeEntryPatchDTO  = new();
            request.ApplyTo(timeEntryPatchDTO, ModelState);
            if (!ModelState.IsValid)
            {
                _logger.LogError($"PatchTimeEntry: bad request.\n{ModelState}");
                return BadRequest(ModelState);
            }

            TimeEntryResponseDTO response = await _timeEntryService.PatchTimeEntryAsync(tId, request, userId);
            return Ok(response);
        }

        [Authorize]
        [HttpDelete("batch")]
        public async Task<ActionResult<BatchResponseDTO>> DeleteTimeEntries([FromQuery] int[] id)
        {
            return Ok();
        }

        [Authorize]
        [HttpPatch("recover/batch")]
        public async Task<ActionResult<BatchResponseDTO>> RecoverTimeEntries([FromQuery] int[] id)
        {
            return Ok();
        }

        [Authorize]
        [HttpPatch("batch")]
        public async Task<ActionResult<BatchResponseDTO>> PatchTimeEntries([FromQuery] int[] id, [FromBody] JsonPatchDocument<TimeEntryDTO> request)
        {
            int userId = ControllerHelper.GetUserId(User);
            TimeEntryDTO timeEntryDTO = new();
            request.ApplyTo(timeEntryDTO, ModelState);
            if (!ModelState.IsValid) return BadRequest("not valid");

            BatchResponseDTO response = await _timeEntryService.PatchTimeEntriesAsync(id, request, userId);
            return Ok(response);
        }
    }
}
