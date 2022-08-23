using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TalStart.Migrations
{
    public partial class six : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Pipelines",
                table: "Pipelines");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Pipelines",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pipelines",
                table: "Pipelines",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Pipelines",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Pipelines");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pipelines",
                table: "Pipelines",
                column: "Name");
        }
    }
}
