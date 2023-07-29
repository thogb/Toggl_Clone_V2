using Microsoft.EntityFrameworkCore;

namespace TogglTrackCloneApi.Data
{
    public class TTCloneContextDev : TTCloneContext
    {
        private readonly IConfiguration _config;

        public TTCloneContextDev(DbContextOptions options, IConfiguration config) : base(options, config)
        {
            this._config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /* base.OnConfiguring(optionsBuilder);*/
            optionsBuilder.UseSqlServer(_config.GetConnectionString("TogglTrackClone"));
        }
    }
}
