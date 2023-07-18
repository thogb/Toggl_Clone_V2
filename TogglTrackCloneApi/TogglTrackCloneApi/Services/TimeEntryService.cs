using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using TogglTrackCloneApi.DTOs.BatchResponse;
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
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);

            // TODO: check projectId exist in workspace

            /*var tagNames = timeEntryDTO.Tags.Distinct().ToList();
            if (tagNames.Count != tagNames.Count) throw new TTIllegalEditException("Duplicate tags found in time entry");
            var tags = await _workspaceRepository.GetTagsFromTagNameList(workspaceId, tagNames);
            if (tags.Count != timeEntryDTO.Tags.Count()) throw new TTIllegalEditException("invalid tags found in time entry");*/

            ICollection<Tag> tags = await ValidateAndGetTagsFromTagNames(timeEntryDTO, workspaceId);

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

            /*var tagNames = timeEntryDTO.Tags.Distinct().ToList();
            if (tagNames.Count != tagNames.Count) throw new TTIllegalEditException("Duplicate tags found in time entry");
            var tags = await _workspaceRepository.GetTagsFromTagNameList(workspaceId, tagNames);
            if (tags.Count != timeEntryDTO.Tags.Count()) throw new TTIllegalEditException("invalid tags found in time entry");*/
            ICollection<Tag> tags = await ValidateAndGetTagsFromTagNames(timeEntryDTO, workspaceId);

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

        public async Task<TimeEntryResponseDTO> PatchTimeEntryAsync(int timeEntryId, JsonPatchDocument<TimeEntryDTO> request, int userId)
        {
            TimeEntry? timeEntry = await _timeEntryRepository.GetByFilterAsync(te => te.Id == timeEntryId, tracked: false);
            if (timeEntry == null) throw new TTNotFoundException("time entry is not found");

            int workspaceId = timeEntry.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);

            TimeEntryDTO timeEntryDTO = _mapper.Map<TimeEntryDTO>(timeEntry);
            request.ApplyTo(timeEntryDTO);

            ICollection<Tag> tags = await ValidateAndGetTagsFromTagNames(timeEntryDTO, workspaceId);
            _timeEntryTagRepository.DeleteByTimeEntryId(timeEntryId);
            await _timeEntryRepository.SaveChangesAsync();

            TimeEntry newTimeEntry = _mapper.Map<TimeEntry>(timeEntryDTO);
            newTimeEntry.Id = timeEntryId;
            newTimeEntry.Tags = tags;
/*            newTimeEntry.WorkspaceId = workspaceId;
            newTimeEntry.UserId = userId;*/

            _timeEntryRepository.Update(newTimeEntry);
            await _timeEntryRepository.SaveChangesAsync();
            return _mapper.Map<TimeEntryResponseDTO>(newTimeEntry);
        }

        public async Task<BatchResponseDTO> PatchTimeEntriesAsync(int[] timeEntryIds, JsonPatchDocument<TimeEntryDTO> request, int userId)
        {
            BatchResponseDTO batchResponseDTO = new BatchResponseDTO();
            List<int> timeEntryIdList = new List<int>(timeEntryIds).Distinct().ToList();
            List<TimeEntry> timeEntries = await _timeEntryRepository.GetAllByFiltersIncludeTagsAsync(te => timeEntryIdList.Contains(te.Id));
            List<int> idFound = timeEntries.Select(t => t.Id).ToList();

            List<int> idNotFound = timeEntryIdList.Where(id => !idFound.Contains(id)).ToList();
            idNotFound.ForEach(id => batchResponseDTO.Failure.Add(new FailureDTO
            {
                Id = id,
                Message = "time entry cannot be found"
            }));

            var groupedTimeEntries = timeEntries
                .GroupBy(t => t.WorkspaceId)
                .Select(g => g.ToList())
                .ToList();

            foreach (var innerTimeEntries in groupedTimeEntries) {
                int workspaceId = innerTimeEntries.First().WorkspaceId;
                if (!await _workspaceService.CanUserEditTimeEntry(workspaceId, userId))
                {
                    PopulateFailure(innerTimeEntries, batchResponseDTO, "No permission to edit time entry");
                } else
                {

                    TimeEntryDTO timeEntryDTO = _mapper.Map<TimeEntryDTO>(innerTimeEntries.First());
                    request.ApplyTo(timeEntryDTO);

                    ICollection<Tag> tags = new List<Tag>();
                    if (timeEntryDTO.Tags.Any())
                    {
                        var tagNames = timeEntryDTO.Tags.Distinct().ToList();
                        if (tagNames.Count != tagNames.Count)
                        {
                            PopulateFailure(innerTimeEntries, batchResponseDTO, "duplicate tags found");
                            continue;
                        }
                        tags = await _workspaceRepository.GetTagsFromTagNameList(workspaceId, tagNames);
                        if (tags.Count != timeEntryDTO.Tags.Count())
                        {
                            PopulateFailure(innerTimeEntries, batchResponseDTO, "invalid tags found");
                            continue;
                        }
                    }

                    foreach (var timeEntry in innerTimeEntries)
                    {
                        int id = timeEntry.Id;
                        _mapper.Map(timeEntryDTO, timeEntry);
                        timeEntry.Tags = tags;
                        timeEntry.Id = id;
                        _timeEntryRepository.Update(timeEntry);
                    }

                    try
                    {
                        await _timeEntryRepository.SaveChangesAsync();
                        innerTimeEntries
                            .ForEach(te => batchResponseDTO.Success.Add(te.Id));
                    } catch (Exception ex)
                    {
                        PopulateFailure(innerTimeEntries, batchResponseDTO, "server error, failed to update");
                    }
                }
            }
            return batchResponseDTO;
        }

        private async Task<ICollection<Tag>> ValidateAndGetTagsFromTagNames(TimeEntryDTO timeEntryDTO, int workspaceId)
        {
            var tagNames = timeEntryDTO.Tags.Distinct().ToList();
            if (tagNames.Count != tagNames.Count) throw new TTIllegalEditException("Duplicate tags found in time entry");
            var tags = await _workspaceRepository.GetTagsFromTagNameList(workspaceId, tagNames);
            if (tags.Count != timeEntryDTO.Tags.Count()) throw new TTIllegalEditException("invalid tags found in time entry");

            return tags;
        }

        private void PopulateFailure(List<TimeEntry> timeEntries, BatchResponseDTO batchResponseDTO, string errorMessage)
        {
            timeEntries
                .ForEach(te => batchResponseDTO.Failure.Add(new FailureDTO
                {
                    Id = te.Id,
                    Message = errorMessage
                }));
        }
    }
}
