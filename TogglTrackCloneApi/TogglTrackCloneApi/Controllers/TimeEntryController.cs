using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.DTOs.BatchResponse;
using TogglTrackCloneApi.DTOs.TimeEntry;
using TogglTrackCloneApi.Exceptions;
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
        [HttpDelete("{ids}")]
        public async Task<ActionResult<BatchResponseDTO>> DeleteTimeEntries(string ids)
        {
            List<int> intIds = ControllerHelper.TryParseStrIds(ids).Distinct().ToList();
            if (intIds.Count == 0) return BadRequest("Invalid ids");

            int userId = ControllerHelper.GetUserId(User);

            if (intIds.Count == 1)
            {
                await _timeEntryService.SoftRemoveTimeEntryAsync(intIds.First(), userId);
                return NoContent();
            } else
            {
                var patch = new JsonPatchDocument<TimeEntryPatchDTO>();
                patch.Replace(e => e.DeleteDate, DateTime.UtcNow);
                BatchResponseDTO response = await _timeEntryService.PatchTimeEntriesAsync(intIds, patch, userId);
                return response;
            }
        }

        [Authorize]
        [HttpPatch("recover/{ids}")]
        public async Task<ActionResult<BatchResponseDTO>> RecoverTimeEntries(string ids)
        {
            List<int> intIds = ControllerHelper.TryParseStrIds(ids).Distinct().ToList();
            if (intIds.Count == 0) return BadRequest("Invalid ids");

            int userId = ControllerHelper.GetUserId(User);
            if (intIds.Count == 1)
            {
                int id = intIds.First();
                BatchResponseDTO response = new BatchResponseDTO();
                try
                {
                    await _timeEntryService.RecoverTimeEntryAsync(id, userId);
                    response.Success.Add(id);
                }
                catch (APIException apiEx)
                {
                    response.Failure.Add(new FailureDTO { Id = id, Message = apiEx.Message });
                }
                return response;
            } else
            {
                var patch = new JsonPatchDocument<TimeEntryPatchDTO>();
                patch.Replace(e => e.DeleteDate, null);
                BatchResponseDTO response = await _timeEntryService.PatchTimeEntriesAsync(intIds, patch, userId);
                return response;
            }
        }

        [Authorize]
        [HttpPatch("{ids}")]
        public async Task<ActionResult<BatchResponseDTO>> PatchTimeEntries(string ids, [FromBody] JsonPatchDocument<TimeEntryPatchDTO> request)
        {
            List<int> intIds = ControllerHelper.TryParseStrIds(ids).Distinct().ToList();
            if (intIds.Count == 0) return BadRequest("Invalid ids");

            TimeEntryPatchDTO timeEntryPatchDTO = new();
            request.ApplyTo(timeEntryPatchDTO, ModelState);
            if (!ModelState.IsValid)
            {
                _logger.LogError($"PatchTimeEntry: bad request.\n{ModelState}");
                return BadRequest(ModelState);
            }

            int userId = ControllerHelper.GetUserId(User);
            if (intIds.Count == 1)
            {
                int id = intIds.First();
                BatchResponseDTO response = new BatchResponseDTO();
                try
                {
                    await _timeEntryService.PatchTimeEntryAsync(id, request, userId);
                    response.Success.Add(id);
                } catch (APIException apiEx)
                {
                    response.Failure.Add(new FailureDTO { Id=id, Message=apiEx.Message });
                }
                return response;
            } else
            {
                BatchResponseDTO response = await _timeEntryService.PatchTimeEntriesAsync(intIds, request, userId);
                return response;
            }
        }
    }
}
