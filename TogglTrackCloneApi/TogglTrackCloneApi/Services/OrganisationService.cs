using AutoMapper;
using TogglTrackCloneApi.DTOs.Organisation;
using TogglTrackCloneApi.DTOs.Workspace;
using TogglTrackCloneApi.Exceptions;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;
using TogglTrackCloneApi.Services.IServices;

namespace TogglTrackCloneApi.Services
{
    public class OrganisationService : IOrganisationService
    {
        private readonly IOrganisationRepository _organisationRepository;
        private readonly IWorkspaceRepository _workspaceRepository;
        private readonly IUserRepository _userRepository;
        private readonly IOrganisationUsersRepository _organisationUsersRepository;
        private readonly IMapper _mapper;

        public OrganisationService(
            IOrganisationRepository organisationRepository, 
            IWorkspaceRepository workspaceRepository, 
            IUserRepository userRepository,
            IOrganisationUsersRepository organisationUsersRepository,
            IMapper mapper)
        {
            this._organisationRepository = organisationRepository;
            this._workspaceRepository = workspaceRepository;
            this._userRepository = userRepository;
            this._organisationUsersRepository = organisationUsersRepository;
            this._mapper = mapper;
        }

        public async Task<OrganisationAddResponseDTO> AddOrganisation(OrganisationAddDTO organisationAddDTO, int userId)
        {
            User? user = await _userRepository.GetByIdAsync(userId);
            if (user == null) throw new TTServiceException("user does not exist");

            await CanUserAddOrganisation(userId);

            Organisation organisation = _mapper.Map<Organisation>(organisationAddDTO);
            WorkspaceAddDTO workspaceAddDTO = new() { Name = organisationAddDTO.WorkspaceName ?? "Default Workspace", OrganisationId = organisation.Id };
            Workspace workspace = _mapper.Map<Workspace>(workspaceAddDTO);

            workspace.Users = new List<User>() { user};
            organisation.Workspaces = new List<Workspace>() { workspace };
            organisation.Users = new List<User>() { user };

            _organisationRepository.Add(organisation);
            await _organisationRepository.SaveChangesAsync();

            return new OrganisationAddResponseDTO() {
                Organisation = _mapper.Map<OrganisatioResponseDTO>(organisation),
                Workspace = _mapper.Map<WorkspaceResponseDTO>(workspace),
            };
        }

        public async Task CanUserAddOrganisation(int userId)
        {
            int userCount = await _organisationUsersRepository.GetUserRecordCount(userId);
            await Console.Out.WriteLineAsync(userCount.ToString());
            if (userCount >= 5) throw new TTRuleException("User cannot be part of more than 5 organisations.");
        }
    }
}
