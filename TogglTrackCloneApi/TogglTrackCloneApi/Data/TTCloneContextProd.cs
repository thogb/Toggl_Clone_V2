using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Helper;

namespace TogglTrackCloneApi.Data
{
    public class TTCloneContextProd : TTCloneContext
    {
        private readonly IConfiguration _config;

        public TTCloneContextProd(DbContextOptions options, IConfiguration config) : base(options, config)
        {
            this._config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /*base.OnConfiguring(optionsBuilder);*/
            optionsBuilder.UseNpgsql(ConnectionHelper.GetConnectionString(_config) ?? "Npsql");
        }
    }
}
