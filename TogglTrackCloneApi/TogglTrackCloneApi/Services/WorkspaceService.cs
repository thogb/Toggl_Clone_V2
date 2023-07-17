using AutoMapper;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Exceptions;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Services
{
    public class WorkspaceService : IWorkspaceService
    {
        private readonly IMapper _mapper;
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IWorkspaceUserRepository _workspaceUserRepository;
        private readonly ITagRepository _tagRepository;

        public WorkspaceService(
            IMapper mapper,
            IWorkspaceRepository workspaceRepository,
            IWorkspaceUserRepository workspaceUserRepository,
            ITagRepository tagRepository)
        {
            this._mapper = mapper;
            this._workspaceRepository = workspaceRepository;
            this._workspaceUserRepository = workspaceUserRepository;
            this._tagRepository = tagRepository;
        }

        public async Task<TagResponseDTO> AddTagAsync(int workspaceId, int userId, TagDTO tagDTO)
        {
            await ValidateUserCanEditTag(workspaceId, userId);
            Tag tag = _mapper.Map<Tag>(tagDTO);
            tag.WorkspaceId = workspaceId;
            tag.UserId = userId;
            _tagRepository.Add(tag);
            await _tagRepository.SaveChangesAsync();
            return _mapper.Map<TagResponseDTO>(tag);
        }

        public async Task<bool> DeleteTagAsync(int workspaceId, int userId, int tagId)
        {
            await ValidateUserCanEditTag(workspaceId, userId);
            await ValidateTagInWorkSpace(workspaceId, tagId);
            _tagRepository.Remove(new Tag { Id = tagId });
            await _tagRepository.SaveChangesAsync();
            return true; 
        }

        public async Task<TagResponseDTO> UpdateTagAsync(int workspaceId, int userId, int tagId, TagDTO tagDTO)
        {
            await ValidateUserCanEditTag(workspaceId, userId);
            await ValidateTagInWorkSpace(workspaceId, tagId);
            Tag tag = _mapper.Map<Tag>(tagDTO);
            tag.Id = tagId;
            _tagRepository.Update(tag);
            await _tagRepository.SaveChangesAsync();
            return _mapper.Map<TagResponseDTO>(tag);
        }

        private async Task ValidateUserCanEditTag(int workspaceId, int userId)
        {
            if (!(await _workspaceUserRepository.RecordExistsAsync(workspaceId, userId))) throw new TTNoPermissionException("user is not part of the workspace");
        }

        private async Task ValidateTagInWorkSpace(int workspaceId, int tagId)
        {
            if (!await _tagRepository.IsTagInWorkSpace(tagId, workspaceId)) throw new TTNotFoundException("tag is not found in workspace");
        }

        private Task ValidateUserCanEditTimeEntry(int workspaceId, int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CanUserEditTag(int workspaceId, int userId)
        {
            bool userCan = await IsUserInWorkspace(workspaceId, userId);

            return userCan;
        }

        public Task<bool> IsTagInWorkspace(int workspaceId, int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> CanUserEditTimeEntry(int workspaceId, int userId)
        {
            bool userCan = await IsUserInWorkspace(workspaceId, userId);

            return userCan;
        }

        public async Task<bool> IsUserInWorkspace(int workspaceId, int userId)
        {
            return await _workspaceUserRepository.RecordExistsAsync(workspaceId, userId);
        }

        public async Task ValidateWorkspaceAndUserCanEditTimeEntry(int workspaceId, int userId)
        {
            if (!await _workspaceRepository.Exists(workspaceId)) throw new TTNotFoundException("workspace does not exist");
            if (!await CanUserEditTimeEntry(workspaceId, userId)) throw new TTNoPermissionException("no permission to edit in workspace");
        }
    }
}
