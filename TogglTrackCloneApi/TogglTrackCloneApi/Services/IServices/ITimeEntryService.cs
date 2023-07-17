using TogglTrackCloneApi.DTOs.TimeEntry;

namespace TogglTrackCloneApi.Services.IServices
{
    public interface ITimeEntryService
    {
        Task<TimeEntryResponseDTO> AddTimeEntry(TimeEntryDTO timeEntryDTO, int userId);
        Task<TimeEntryResponseDTO> UpdateTimeEntry(int timeEntryId, TimeEntryDTO timeEntryDTO, int userId);
        Task<bool> SoftRemoveTimeEntryAsync(int timeEntryId, int userId);
        Task<bool> UnRemoveTimeEntryAsync(int timeEntryId, int userId);
    }
}
