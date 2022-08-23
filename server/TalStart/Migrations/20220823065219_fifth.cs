using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace TalStart.Migrations
{
    public partial class fifth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetName",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_SourceDatasetName",
                table: "Pipelines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dataSets",
                table: "dataSets");

            migrationBuilder.DropColumn(
                name: "DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "SourceDatasetName",
                table: "Pipelines");

            migrationBuilder.AddColumn<int>(
                name: "DestinationDatasetId",
                table: "Pipelines",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SourceDatasetId",
                table: "Pipelines",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "dataSets",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_dataSets",
                table: "dataSets",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_DestinationDatasetId",
                table: "Pipelines",
                column: "DestinationDatasetId");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_SourceDatasetId",
                table: "Pipelines",
                column: "SourceDatasetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetId",
                table: "Pipelines",
                column: "DestinationDatasetId",
                principalTable: "dataSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetId",
                table: "Pipelines",
                column: "SourceDatasetId",
                principalTable: "dataSets",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetId",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetId",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_DestinationDatasetId",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_SourceDatasetId",
                table: "Pipelines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dataSets",
                table: "dataSets");

            migrationBuilder.DropColumn(
                name: "DestinationDatasetId",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "SourceDatasetId",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "dataSets");

            migrationBuilder.AddColumn<string>(
                name: "DestinationDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SourceDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_dataSets",
                table: "dataSets",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_DestinationDatasetName",
                table: "Pipelines",
                column: "DestinationDatasetName");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_SourceDatasetName",
                table: "Pipelines",
                column: "SourceDatasetName");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetName",
                table: "Pipelines",
                column: "DestinationDatasetName",
                principalTable: "dataSets",
                principalColumn: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetName",
                table: "Pipelines",
                column: "SourceDatasetName",
                principalTable: "dataSets",
                principalColumn: "Name");
        }
    }
}
