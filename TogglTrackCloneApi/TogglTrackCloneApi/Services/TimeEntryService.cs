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
        private readonly ITagRepository _tagRepository;

        public TimeEntryService(
            IMapper mapper,
            ITimeEntryRepository timeEntryRepository,
            IWorkspaceService workspaceService,
            IWorkspaceRepository workspaceRepository,
            ITimeEntryTagRepository timeEntryTagRepository,
            ITagRepository tagRepository
            )
        {
            this._mapper = mapper;
            this._timeEntryRepository = timeEntryRepository;
            this._workspaceService = workspaceService;
            this._workspaceRepository = workspaceRepository;
            this._timeEntryTagRepository = timeEntryTagRepository;
            this._tagRepository = tagRepository;
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

            ICollection<Tag> tags = await ValidateAndGetTagsFromTimeEntryDTO(timeEntryDTO, workspaceId);

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
            ICollection<Tag> tags = await ValidateAndGetTagsFromTimeEntryDTO(timeEntryDTO, workspaceId);

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

        public async Task<bool> RecoverTimeEntryAsync(int timeEntryId, int userId)
        {
            var timeEntry = await _timeEntryRepository.GetByIdAsync(timeEntryId);
            if (timeEntry == null) throw new TTNotFoundException("time entry is not found");

            int workspaceId = timeEntry.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);

            _timeEntryRepository.Recover(timeEntry);
            await _timeEntryRepository.SaveChangesAsync();
            return true;
        }

        public async Task<TimeEntryResponseDTO> PatchTimeEntryAsync(int timeEntryId, JsonPatchDocument<TimeEntryPatchDTO> request, int userId)
        {
            TimeEntry? timeEntry = (await _timeEntryRepository.GetAllByFiltersIncludeTagsAsync(te => te.Id == timeEntryId, tracked: true)).FirstOrDefault();
            if (timeEntry == null) throw new TTNotFoundException("time entry is not found");

            int workspaceId = timeEntry.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditTimeEntry(workspaceId, userId);

            TimeEntryPatchDTO dummyTimeEntryPatchDTO = new();
            request.ApplyTo(dummyTimeEntryPatchDTO);

            List<Tag>? tags = null;
            if (dummyTimeEntryPatchDTO.Tags != null)
            {
                tags = await ValidateAndGetTagsFromTagNames(dummyTimeEntryPatchDTO.Tags, workspaceId);
            }

            TimeEntryPatchDTO timeEntryPatchDTO = _mapper.Map<TimeEntryPatchDTO>(timeEntry);
            request.ApplyTo(timeEntryPatchDTO);
            DateTime tempDate = timeEntry.StartDate;
            _mapper.Map(timeEntryPatchDTO, timeEntry);

            if (!dummyTimeEntryPatchDTO.ChangeStartTime)
            {
                timeEntry.StartDate = timeEntry.StartDate.Date.Add(new TimeSpan(tempDate.Hour, tempDate.Minute, tempDate.Second));
            }

            _timeEntryRepository.UpdateDateInfo(timeEntry);
            if (tags != null) timeEntry.Tags = tags;

            await _timeEntryRepository.SaveChangesAsync();
            return _mapper.Map<TimeEntryResponseDTO>(timeEntry);
        }

        public async Task<BatchResponseDTO> PatchTimeEntriesAsync(List<int> timeEntryIds, JsonPatchDocument<TimeEntryPatchDTO> request, int userId)
        {
            BatchResponseDTO batchResponseDTO = new BatchResponseDTO();
            List<int> timeEntryIdList = timeEntryIds.Distinct().ToList();
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
                    TimeEntryPatchDTO dummyTimeEntryPatchDTO = new();
                    request.ApplyTo(dummyTimeEntryPatchDTO);

                    List<Tag>? tags = null;
                    if (dummyTimeEntryPatchDTO.Tags != null)
                    {
                        try
                        {
                            tags = await ValidateAndGetTagsFromTagNames(dummyTimeEntryPatchDTO.Tags, workspaceId);
                        } catch (APIException ex)
                        {
                            PopulateFailure(innerTimeEntries, batchResponseDTO, ex.Message);
                        }
                    }

                    foreach (var timeEntry in innerTimeEntries)
                    {
                        TimeEntryPatchDTO timeEntryDTO = _mapper.Map<TimeEntryPatchDTO>(innerTimeEntries.First());
                        request.ApplyTo(timeEntryDTO);

                        if (!dummyTimeEntryPatchDTO.ChangeStartTime)
                        {
                            DateTime tempDate = timeEntryDTO.StartDate;
                            _mapper.Map(timeEntryDTO, timeEntry);
                            timeEntry.StartDate = timeEntryDTO.StartDate.Date.Add(new TimeSpan(tempDate.Hour, tempDate.Minute, tempDate.Second));
                        } else
                        {
                            _mapper.Map(timeEntryDTO, timeEntry);
                        }
                        _timeEntryRepository.UpdateDateInfo(timeEntry);
                        if (tags != null) timeEntry.Tags = tags;
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

        private async Task<List<Tag>> ValidateAndGetTagsFromTimeEntryDTO(TimeEntryDTO timeEntryDTO, int workspaceId)
        {
            if (!timeEntryDTO.Tags.Any()) return new List<Tag>();
            return await ValidateAndGetTagsFromTagNames(timeEntryDTO.Tags, workspaceId);
        }

        public async Task<List<Tag>> ValidateAndGetTagsFromTagNames(ICollection<string> inTagNames, int workspaceId)
        {
            var tagNames = inTagNames.Distinct().ToList();
            if (tagNames.Count == 0) return new List<Tag>();
            if (tagNames.Count != tagNames.Count) throw new TTIllegalEditException("Duplicate tags found in time entry");
            /*var tags = await _workspaceRepository.GetTagsFromTagNameList(workspaceId, tagNames);*/
            var tags = await _tagRepository
                            .GetAllByFilterAsync(t => t.WorkspaceId == workspaceId && tagNames.Contains(t.Name));
            if (tags.Count != inTagNames.Count) throw new TTIllegalEditException("invalid tags found in time entry");

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

        public Task<BatchResponseDTO> SoftRemoveTimeEntriesAsync(int[] timeEntryIds, int userId)
        {
            throw new NotImplementedException();
        }

        public Task<BatchResponseDTO> RecoverTimeEntriesAsync(int[] timeEntryIds, int userId)
        {
            throw new NotImplementedException();
        }
    }
}
