using AutoMapper;
using TogglTrackCloneApi.DTOs.TimeEntry;
using TogglTrackCloneApi.Exceptions;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Services
{
    public class TimeEntryService : ITimeEntryService
    {
        private readonly IMapper _mapper;
        private readonly ITimeEntryRepository _timeEntryRepository;
        private readonly IWorkspaceService _workspaceService;
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly ITimeEntryTagRepository _timeEntryTagRepository;

        public TimeEntryService(
            IMapper mapper,
            ITimeEntryRepository timeEntryRepository,
            IWorkspaceService workspaceService,
            IWorkspaceRepository workspaceRepository,
            ITimeEntryTagRepository timeEntryTagRepository
            )
        {
            this._mapper = mapper;
            this._timeEntryRepository = timeEntryRepository;
            this._workspaceService = workspaceService;
            this._workspaceRepository = workspaceRepository;
            this._timeEntryTagRepository = timeEntryTagRepository;
        }

        public async Task<TimeEntryResponseDTO> AddTimeEntry(TimeEntryDTO timeEntryDTO, int userId)
        {
            int workspaceId = timeEntryDTO.WorkspaceId;
            /*if (!await _workspaceRepository.Exists(workspaceId)) throw new TTNotFoundException("workspace does not exist");
            if (!await _workspaceService.CanUserEditTimeEntry(workspaceId, userId)) throw new TTNoPermissionException("no permission to edit in workspace");*/
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);
            // TODO: check projectId exist in workspace
            var tags = await _workspaceRepository.GetTagsFromTagIdList(workspaceId, timeEntryDTO.TagIds);
            if (tags.Count != timeEntryDTO.TagIds.Count()) throw new TTIllegalEditException("invalid tags found in time entry");
            TimeEntry timeEntry = _mapper.Map<TimeEntry>(timeEntryDTO);
            timeEntry.Tags = tags;
            timeEntry.UserId = userId;
            _timeEntryRepository.Add(timeEntry);
            await _timeEntryRepository.SaveChangesAsync();
            var response = _mapper.Map<TimeEntryResponseDTO>(timeEntry);
            return response;
        }

        public async Task<TimeEntryResponseDTO> UpdateTimeEntry(int timeEntryId, TimeEntryDTO timeEntryDTO, int userId)
        {
            int workspaceId = timeEntryDTO.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);
            if (!await _timeEntryRepository.IsTimeEntryInWorkspace(timeEntryId, workspaceId)) throw new TTNotFoundException("time entry not found");
            // TODO: check projectId exist in workspace
            var tags = await _workspaceRepository.GetTagsFromTagIdList(workspaceId, timeEntryDTO.TagIds);
            if (tags.Count != timeEntryDTO.TagIds.Count()) throw new TTIllegalEditException("invalid tags found in time entry");
            _timeEntryTagRepository.DeleteByTimeEntryId(timeEntryId);
            await _timeEntryRepository.SaveChangesAsync();
            TimeEntry timeEntry = _mapper.Map<TimeEntry>(timeEntryDTO);
            timeEntry.Id = timeEntryId;
            timeEntry.Tags = tags;
            _timeEntryRepository.Update(timeEntry);
            await _timeEntryRepository.SaveChangesAsync();
            var response = _mapper.Map<TimeEntryResponseDTO>(timeEntry);
            return response;
        }

        public async Task<bool> SoftRemoveTimeEntryAsync(int timeEntryId, int userId)
        {
            var timeEntry = await _timeEntryRepository.GetByIdAsync(timeEntryId);
            if (timeEntry == null || timeEntry.DeleteDate != null) throw new TTNotFoundException("time entry is not found");
            int workspaceId = timeEntry.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);
            _timeEntryRepository.SoftRemove(timeEntry);
            await _timeEntryRepository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnRemoveTimeEntryAsync(int timeEntryId, int userId)
        {
            var timeEntry = await _timeEntryRepository.GetByIdAsync(timeEntryId);
            if (timeEntry == null) throw new TTNotFoundException("time entry is not found");
            int workspaceId = timeEntry.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);
            _timeEntryRepository.UnDelete(timeEntry);
            await _timeEntryRepository.SaveChangesAsync();
            return true;
        }
    }
}
