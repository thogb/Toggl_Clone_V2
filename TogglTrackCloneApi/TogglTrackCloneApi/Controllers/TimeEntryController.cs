using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TogglTrackCloneApi.DTOs.TimeEntry;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/time_entries")]
    [ApiController]
    public class TimeEntryController : ControllerBase
    {
        private readonly ITimeEntryService _timeEntryService;

        public TimeEntryController(ITimeEntryService timeEntryService)
        {
            this._timeEntryService = timeEntryService;
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
        [HttpPatch("{tId}/undo")]
        public async Task<ActionResult> UndoDeletedTimeEntry(int tId)
        {
            int userId = ControllerHelper.GetUserId(User);
            await _timeEntryService.UnRemoveTimeEntryAsync(tId, userId);
            return Ok();
        }
    }
}
