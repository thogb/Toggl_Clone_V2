namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IOrganisationUsersRepository
    {
        Task<int> GetUserRecordCount(int userId);
    }
}
