using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using TogglTrackCloneApi.DTOs.Project;
using TogglTrackCloneApi.Exceptions;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IWorkspaceService _workspaceService;
        private readonly IMapper _mapper;

        public ProjectService(
            IProjectRepository projectRepository,
            IWorkspaceService workspaceService,
            IMapper mapper
            )
        {
            this._projectRepository = projectRepository;
            this._workspaceService = workspaceService;
            this._mapper = mapper;
        }

        public async Task<ProjectResponseDTO> AddProject(ProjectDTO projectDTO, int userId)
        {
            int workspaceId = projectDTO.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditProject(workspaceId, userId);

            Project project = _mapper.Map<Project>( projectDTO);

            _projectRepository.Update(project);
            await _projectRepository.SaveChangesAsync();
            return _mapper.Map<ProjectResponseDTO>(project);
        }

        public async Task<ProjectResponseDTO> PatchProject(int projectId, JsonPatchDocument<ProjectDTO> request, int userId)
        {
            Project? project = await _projectRepository.GetByFilterAsync(p => p.Id == projectId);
            if (project == null) throw new TTNotFoundException("project not found");

            int workspaceId = project.WorkspaceId;
            await _workspaceService.ValidateWorkspaceAndUserCanEditProject(workspaceId, userId);

            ProjectDTO projectDTO = _mapper.Map<ProjectDTO>(project);
            request.ApplyTo(projectDTO);
            if (projectDTO.WorkspaceId > 0 && projectDTO.WorkspaceId != project.WorkspaceId)
                throw new TTIllegalEditException("cannot edit workspace id");

            _mapper.Map(projectDTO, project);

            _projectRepository.Update(project);
            await _projectRepository.SaveChangesAsync();
            return _mapper.Map<ProjectResponseDTO>(project);
        }

        public async Task<bool> SoftDeleteProject(int projectId, int workspaceId, int userId)
        {
            Project? project = await _projectRepository.GetByFilterAsync(p => p.Id == projectId && p.WorkspaceId == workspaceId);
            if (project == null) throw new TTNotFoundException("project not found");

            await _workspaceService.ValidateWorkspaceAndUserCanEditProject(workspaceId, userId);

            _projectRepository.SoftRemove(project);
            await _projectRepository.SaveChangesAsync();
            return true;
        }

        public async Task<ProjectResponseDTO> UpdateProject(int projectId, ProjectDTO projectDTO, int userId)
        {
            int workspaceId = projectDTO.WorkspaceId;

            Project? project = await _projectRepository.GetByFilterAsync(p => p.Id == projectId && p.WorkspaceId == workspaceId);
            if (project == null) throw new TTNotFoundException("project not found");

            await _workspaceService.ValidateWorkspaceAndUserCanEditProject(workspaceId, userId);

            _mapper.Map(projectDTO, project);

            _projectRepository.Update(project);
            await _projectRepository.SaveChangesAsync();
            return _mapper.Map<ProjectResponseDTO>(project);
        }
    }
}
