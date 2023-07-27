using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TogglTrackCloneApi.DTOs.Organisation;
using TogglTrackCloneApi.DTOs.Project;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.DTOs.TimeEntry;
using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Controllers
{
    [Route("api/Me")]
    [ApiController]
    public class MeController : ControllerBase
    {
        private readonly IUserServices _userServices;
        private readonly IMapper _mapper;

        public MeController(
            IUserServices userServices,
            IMapper mapper
            )
        {
            this._userServices = userServices;
            this._mapper = mapper;
        }

        [Authorize]
        [HttpGet("Organisations")]
        public async Task<ActionResult<List<OrganisatioResponseDTO>>> GetMyOrganisations()
        {
            int userId = ControllerHelper.GetUserId(User);
            var organisations = await _userServices.GetOrganisations(userId);
            return Ok(organisations
                .Select(o => _mapper.Map<OrganisatioResponseDTO>(o))
                .ToList());
        }

        [Authorize]
        [HttpGet("Workspaces")]
        public async Task<ActionResult<List<WorkspaceResponseDTO>>> GetMyWorkspaces()
        {
            int userId = ControllerHelper.GetUserId(User);
            var workspaces = await _userServices.GetWorkspaces(userId);
            return Ok(workspaces
                .Select(w => _mapper.Map<WorkspaceResponseDTO>(w))
                .ToList());
        }

        [Authorize]
        [HttpGet("Time_Entries")]
        public async Task<ActionResult> GetMyTimeEntries()
        {
            int userId = ControllerHelper.GetUserId(User);
            var timeEntries = await _userServices.GetTimeEntries(userId);
            return Ok(timeEntries
                .Select(te => _mapper.Map<TimeEntryResponseDTO>(te))
                .ToList());
        }

        [Authorize]
        [HttpGet("Tags")]
        public async Task<ActionResult> GetMyWorkingTags()
        {
            int userId = ControllerHelper.GetUserId(User);
            var tags = await _userServices.GetWorkingTags(userId);
            return Ok(tags
                .Select(t => _mapper.Map<TagResponseDTO>(t))
                .ToList());
        }

        [Authorize]
        [HttpGet("Projects")]
        public async Task<ActionResult> GetMyWorkingProjects()
        {
            int userId = ControllerHelper.GetUserId(User);
            var projects = await _userServices.GetWorkingProjects(userId);
            return Ok(projects
                .Select(p => _mapper.Map<ProjectResponseDTO>(p))
                .ToList());
        }
    }
}
