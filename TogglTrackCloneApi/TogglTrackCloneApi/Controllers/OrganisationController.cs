using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TogglTrackCloneApi.DTOs.Organisation;
using TogglTrackCloneApi.Exceptions;
using TogglTrackCloneApi.Helper;
using TogglTrackCloneApi.Services;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Controllers
{
    [Authorize]
    [Route("api/Organisations")]
    [ApiController]
    public class OrganisationController : ControllerBase
    {
        private readonly IOrganisationService _organisationService;
        private readonly ILogger<OrganisationController> _logger;

        public OrganisationController(IOrganisationService organisationService, ILogger<OrganisationController> logger)
        {
            this._organisationService = organisationService;
            this._logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<OrganisationAddResponseDTO>> AddOrganisation([FromBody] OrganisationAddDTO organisationAddDTO)
        {
            try
            {
                int userId = ControllerHelper.GetUserId(User);
                var response = await _organisationService.AddOrganisation(organisationAddDTO, userId);
                return Ok(response);
            } catch (APIException apiE) { 
                return BadRequest(apiE.Message);
            } catch (Exception ex) {
                _logger.LogError(ex.Message, ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed");
            }
        }
    }
}
