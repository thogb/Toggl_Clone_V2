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

        public async Task AddOrganisation(OrganisationAddDTO organisationAddDTO, int userId)
        {
            User? user = await _userRepository.GetUserByUserId(userId);
            if (user == null) throw new TTServiceException("user does not exist");

            await CanUserAddOrganisation(userId);

            Organisation organisation = _mapper.Map<Organisation>(organisationAddDTO);
            WorkspaceAddDTO workspaceAddDTO = new() { Name = organisationAddDTO.WorkspaceName ?? "Default Workspace", OrganisationId = organisation.Id };
            Workspace workspace = _mapper.Map<Workspace>(workspaceAddDTO);

            workspace.Users = new List<User>() { user};
            organisation.Workspaces = new List<Workspace>() { workspace };
            organisation.Users = new List<User>() { user };

            _organisationRepository.AddOrganisation(organisation);
            await _organisationRepository.SaveChangesAsync();
/*
            Organisation organisation = _mapper.Map<Organisation>(organisationAddDTO);
            _organisationRepository.AddOrganisation(organisation);
            await _organisationRepository.SaveChangesAsync();

            WorkspaceAddDTO workspaceAddDTO = new() {Name= "Default Workspace", OrganisationId = organisation.Id};
            Workspace workspace = _mapper.Map<Workspace>(workspaceAddDTO);
            _workspaceRepository.addWorkspace(workspace);
            await _workspaceRepository.SaveChangesAsync();

            await Console.Out.WriteLineAsync(user.Id.ToString());*/

            /* organisation.OrganisationUsers = new List<OrganisationUser>() { new OrganisationUser() { OrganisationId = organisation.OrganisationId, UserId = userId, JoinDate = DateTime.UtcNow } };
            user.WorkspaceUsers = new List<WorkspaceUser>() { new WorkspaceUser() { UserId = userId, WorkspaceId = workspace.WorkspaceId, JoinDate = DateTime.UtcNow } };*/

            /*await _organisationRepository.SaveChangesAsync();*/
        }

        public async Task CanUserAddOrganisation(int userId)
        {
            int userCount = await _organisationUsersRepository.GetUserRecordCount(userId);
            await Console.Out.WriteLineAsync(userCount.ToString());
            if (userCount >= 5) throw new APIException("User cannot be part of more than 5 organisations.");
        }
    }
}
