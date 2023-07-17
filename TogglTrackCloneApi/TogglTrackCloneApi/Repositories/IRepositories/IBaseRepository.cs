namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface IBaseRepository
    {
        Task<bool> SaveChangesAsync();
    }
}
