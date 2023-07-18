using Microsoft.AspNetCore.JsonPatch;
using TogglTrackCloneApi.DTOs.BatchResponse;
using TogglTrackCloneApi.DTOs.TimeEntry;

namespace TogglTrackCloneApi.Services.IServices
{
    public interface ITimeEntryService
    {
        Task<TimeEntryResponseDTO> AddTimeEntry(TimeEntryDTO timeEntryDTO, int userId);
        Task<TimeEntryResponseDTO> UpdateTimeEntry(int timeEntryId, TimeEntryDTO timeEntryDTO, int userId);
        Task<bool> SoftRemoveTimeEntryAsync(int timeEntryId, int userId);
        Task<bool> UnRemoveTimeEntryAsync(int timeEntryId, int userId);
        Task<TimeEntryResponseDTO> PatchTimeEntryAsync(int timeEntryId, JsonPatchDocument<TimeEntryDTO> request, int userId);
        Task<BatchResponseDTO> PatchTimeEntriesAsync(int[] timeEntryIds, JsonPatchDocument<TimeEntryDTO> request, int userId);
    }
}
