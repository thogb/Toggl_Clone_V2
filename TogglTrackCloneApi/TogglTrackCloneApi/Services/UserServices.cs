using AutoMapper;
using TogglTrackCloneApi.DTOs.Organisation;
using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Exceptions;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;
        private readonly ITagRepository _tagRepository;
        private readonly ITimeEntryRepository _timeEntryRepository;
        private readonly IProjectRepository _projectRepository;
        private readonly IMapper _mapper;

        public UserServices(
            IUserRepository userRepository,
            ITagRepository tagRepository,
            ITimeEntryRepository timeEntryRepository,
            IProjectRepository projectRepository,
            IMapper mapper
            )
        {
            this._userRepository = userRepository;
            this._tagRepository = tagRepository;
            this._timeEntryRepository = timeEntryRepository;
            this._projectRepository = projectRepository;
            this._mapper = mapper;
        }

        public async Task<List<Organisation>> GetOrganisations(int userId)
        {
            await Console.Out.WriteLineAsync($"UserId: {userId}");
            User? user = await _userRepository.GetByFilterIncludeAsync(u => u.Id == userId, includeOrganisation: true);
            if (user == null) throw new TTNotFoundException("user not found");
            List<Organisation> organisations = user.Organisations.ToList();
            return organisations;
        }

        public async Task<List<Workspace>> GetWorkspaces(int userId)
        {
            User? user = await _userRepository.GetByFilterIncludeAsync(u => u.Id == userId, includeWorkspace: true);
            if (user == null) throw new TTNotFoundException("user not found");
            return user.Workspaces
                .ToList();
        }

        public async Task<List<Tag>> GetWorkingTags(int userId)
        {
            var workspaceIds = (await GetWorkspaces(userId))
                .Select(w => w.Id)
                .ToList();
            var tags = await _tagRepository.GetAllByFilterAsync(t => workspaceIds.Contains(t.WorkspaceId), tracked: false);
            return tags;
        }

        public async Task<List<TimeEntry>> GetTimeEntries(int userId)
        {
            if (!await _userRepository.Exists(userId)) throw new TTNotFoundException("user not found");
            var timeEntries = await _timeEntryRepository
                .GetAllByFiltersIncludeTagsAsync(te => te.UserId == userId, tracked: false);
            return timeEntries;
        }

        public async Task<List<Project>> GetWorkingProjects(int userId)
        {
            var workspaceIds = (await GetWorkspaces(userId))
                .Select(w => w.Id)
                .ToList();
            var projects = await _projectRepository.GetAllByFilterAsync(p => workspaceIds.Contains(p.WorkspaceId), tracked: false);
            return projects;
        }
    }
}
