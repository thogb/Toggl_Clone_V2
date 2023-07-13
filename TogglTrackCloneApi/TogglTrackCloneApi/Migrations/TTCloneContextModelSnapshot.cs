﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TogglTrackCloneApi.Data;

#nullable disable

namespace TogglTrackCloneApi.Migrations
{
    [DbContext(typeof(TTCloneContext))]
    partial class TTCloneContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.19")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("TogglTrackCloneApi.Models.Organisation", b =>
                {
                    b.Property<int>("OrganisationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrganisationId"), 1L, 1);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("OrganisationId");

                    b.ToTable("Organisations");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.OrganisationUser", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("OrganisationId")
                        .HasColumnType("int");

                    b.Property<DateTime>("JoinDate")
                        .HasColumnType("datetime2");

                    b.HasKey("UserId", "OrganisationId");

                    b.HasIndex("OrganisationId");

                    b.ToTable("OrganisationUser");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Project", b =>
                {
                    b.Property<int>("ProjectId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProjectId"), 1L, 1);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("WorkspaceId")
                        .HasColumnType("int");

                    b.HasKey("ProjectId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("Projects");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Tag", b =>
                {
                    b.Property<int>("TagId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TagId"), 1L, 1);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(32)
                        .HasColumnType("nvarchar(32)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WorkspaceId")
                        .HasColumnType("int");

                    b.HasKey("TagId");

                    b.HasIndex("UserId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.TimeEntry", b =>
                {
                    b.Property<int>("TimeEntryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TimeEntryId"), 1L, 1);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<int>("Duration")
                        .HasColumnType("int");

                    b.Property<bool?>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int?>("ProjectId")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("StopDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WorkspaceId")
                        .HasColumnType("int");

                    b.HasKey("TimeEntryId");

                    b.HasIndex("ProjectId");

                    b.HasIndex("UserId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("TimeEntries");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.TimeEntryTag", b =>
                {
                    b.Property<int>("TimeEntryId")
                        .HasColumnType("int");

                    b.Property<int>("TagId")
                        .HasColumnType("int");

                    b.HasKey("TimeEntryId", "TagId");

                    b.HasIndex("TagId");

                    b.ToTable("TimeEntryTag");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"), 1L, 1);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(46)
                        .HasColumnType("nvarchar(46)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(46)
                        .HasColumnType("nvarchar(46)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Workspace", b =>
                {
                    b.Property<int>("WorkspaceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WorkspaceId"), 1L, 1);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("nvarchar(64)");

                    b.Property<int>("OrganisationId")
                        .HasColumnType("int");

                    b.HasKey("WorkspaceId");

                    b.HasIndex("OrganisationId");

                    b.ToTable("Workspaces");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.WorkspaceUser", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("WorkspaceId")
                        .HasColumnType("int");

                    b.Property<DateTime>("JoinDate")
                        .HasColumnType("datetime2");

                    b.HasKey("UserId", "WorkspaceId");

                    b.HasIndex("WorkspaceId");

                    b.ToTable("WorkspaceUser");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.OrganisationUser", b =>
                {
                    b.HasOne("TogglTrackCloneApi.Models.Organisation", "Organisation")
                        .WithMany("OrganisationUsers")
                        .HasForeignKey("OrganisationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TogglTrackCloneApi.Models.User", "User")
                        .WithMany("OrganisationUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organisation");

                    b.Navigation("User");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Project", b =>
                {
                    b.HasOne("TogglTrackCloneApi.Models.Workspace", "Workspace")
                        .WithMany("Projects")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Workspace");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Tag", b =>
                {
                    b.HasOne("TogglTrackCloneApi.Models.User", "User")
                        .WithMany("Tags")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("TogglTrackCloneApi.Models.Workspace", "Workspace")
                        .WithMany("Tags")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Workspace");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.TimeEntry", b =>
                {
                    b.HasOne("TogglTrackCloneApi.Models.Project", "Project")
                        .WithMany("TimeEntries")
                        .HasForeignKey("ProjectId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("TogglTrackCloneApi.Models.User", "User")
                        .WithMany("TimeEntries")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("TogglTrackCloneApi.Models.Workspace", "Workspace")
                        .WithMany("TimeEntries")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Project");

                    b.Navigation("User");

                    b.Navigation("Workspace");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.TimeEntryTag", b =>
                {
                    b.HasOne("TogglTrackCloneApi.Models.Tag", "Tag")
                        .WithMany("TimeEntryTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TogglTrackCloneApi.Models.TimeEntry", "TimeEntry")
                        .WithMany("TimeEntryTags")
                        .HasForeignKey("TimeEntryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Tag");

                    b.Navigation("TimeEntry");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Workspace", b =>
                {
                    b.HasOne("TogglTrackCloneApi.Models.Organisation", "Organisation")
                        .WithMany("Workspaces")
                        .HasForeignKey("OrganisationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organisation");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.WorkspaceUser", b =>
                {
                    b.HasOne("TogglTrackCloneApi.Models.User", "User")
                        .WithMany("WorkspaceUsers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("TogglTrackCloneApi.Models.Workspace", "Workspace")
                        .WithMany("WorkspaceUsers")
                        .HasForeignKey("WorkspaceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");

                    b.Navigation("Workspace");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Organisation", b =>
                {
                    b.Navigation("OrganisationUsers");

                    b.Navigation("Workspaces");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Project", b =>
                {
                    b.Navigation("TimeEntries");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Tag", b =>
                {
                    b.Navigation("TimeEntryTags");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.TimeEntry", b =>
                {
                    b.Navigation("TimeEntryTags");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.User", b =>
                {
                    b.Navigation("OrganisationUsers");

                    b.Navigation("Tags");

                    b.Navigation("TimeEntries");

                    b.Navigation("WorkspaceUsers");
                });

            modelBuilder.Entity("TogglTrackCloneApi.Models.Workspace", b =>
                {
                    b.Navigation("Projects");

                    b.Navigation("Tags");

                    b.Navigation("TimeEntries");

                    b.Navigation("WorkspaceUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
