using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TogglTrackCloneApi.Migrations
{
    public partial class dropjoindate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JoinDate",
                table: "WorkspaceUser");

            migrationBuilder.DropColumn(
                name: "JoinDate",
                table: "OrganisationUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "JoinDate",
                table: "WorkspaceUser",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()");

            migrationBuilder.AddColumn<DateTime>(
                name: "JoinDate",
                table: "OrganisationUser",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETUTCDATE()");
        }
    }
}
