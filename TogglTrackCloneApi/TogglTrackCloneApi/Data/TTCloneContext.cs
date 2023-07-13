using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Data
{
    public class TTCloneContext : DbContext
    {
        private readonly IConfiguration _config;

        public TTCloneContext(DbContextOptions options, IConfiguration config) : base(options)
        {
            _config = config;
        }

        public DbSet<Organisation> Organisations { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TimeEntry> TimeEntries { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Workspace> Workspaces { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /*base.OnConfiguring(optionsBuilder);*/
            optionsBuilder.UseSqlServer(_config.GetConnectionString("TogglTrackClone"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*base.OnModelCreating(modelBuilder);*/

            // #configure
            // #project
            // workspace delete, all project within is deleted
            modelBuilder.Entity<Workspace>()
                .HasMany(w => w.Projects)
                .WithOne(p => p.Workspace)
                .OnDelete(DeleteBehavior.Cascade);

            // #workspace
            modelBuilder.Entity<Organisation>()
                .HasMany(o => o.Workspaces)
                .WithOne(w => w.Organisation)
                .OnDelete(DeleteBehavior.Cascade);

            // #timeEntry
            modelBuilder.Entity<Project>()
                .HasMany(p => p.TimeEntries)
                .WithOne(te => te.Project)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<User>()
                .HasMany(u => u.TimeEntries)
                .WithOne(te => te.User)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Workspace>()
                .HasMany(w => w.TimeEntries)
                .WithOne(te => te.Workspace)
                .OnDelete(DeleteBehavior.Restrict);

            // #tag
            // Many tag is created by one User.
            // Tag contains UserId representing the user that created the tag, when user is deleted
            // this field is set to null.
            modelBuilder.Entity<User>()
                .HasMany(u => u.Tags)
                .WithOne(t => t.User)
                .OnDelete(DeleteBehavior.SetNull);
            modelBuilder.Entity<Workspace>()
                .HasMany(u => u.Tags)
                .WithOne(t => t.Workspace)
                .OnDelete(DeleteBehavior.Restrict);

            // #timeEntryTag
            // One TimeEntry has a list of tags.
            // One tag can exist in many TimeEntry's list of tags.
            // Default delete behavior of cascade.
            modelBuilder.Entity<TimeEntryTag>().
            HasKey(tet => new { tet.TimeEntryId, tet.TagId });
            modelBuilder.Entity<TimeEntryTag>()
                .HasOne(tet => tet.TimeEntry)
                .WithMany(te => te.TimeEntryTags)
                .HasForeignKey(te => te.TimeEntryId);
            modelBuilder.Entity<TimeEntryTag>()
                .HasOne(tet => tet.Tag)
                .WithMany(t => t.TimeEntryTags)
                .HasForeignKey(t => t.TagId);

            // #userWorkspace
            // User may join many workspace.
            // Workspace has many users.
            // Default delete behavior.
            modelBuilder.Entity<WorkspaceUser>()
                .HasKey(uw => new { uw.UserId, uw.WorkspaceId });
            modelBuilder.Entity<WorkspaceUser>()
                .HasOne(uw => uw.User)
                .WithMany(u => u.WorkspaceUsers)
                .HasForeignKey(uw => uw.UserId);
            modelBuilder.Entity<WorkspaceUser>()
                .HasOne(uw => uw.Workspace)
                .WithMany(w => w.WorkspaceUsers)
                .HasForeignKey(uw => uw.WorkspaceId);

            // #userOrganisation
            modelBuilder.Entity<OrganisationUser>()
                .HasKey(uo => new { uo.UserId, uo.OrganisationId });
            modelBuilder.Entity<OrganisationUser>()
                .HasOne(ou => ou.User)
                .WithMany(u => u.OrganisationUsers)
                .HasForeignKey(ou => ou.UserId);
            modelBuilder.Entity<OrganisationUser>()
                .HasOne(ou => ou.Organisation)
                .WithMany(o => o.OrganisationUsers)
                .HasForeignKey(ou => ou.OrganisationId);
        }
    }
}
