using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalStart.Migrations
{
    public partial class third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DestinationDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SourceDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_DestinationDatasetName",
                table: "Pipelines",
                column: "DestinationDatasetName");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_SourceDatasetName",
                table: "Pipelines",
                column: "SourceDatasetName");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_DataSet_DestinationDatasetName",
                table: "Pipelines",
                column: "DestinationDatasetName",
                principalTable: "DataSet",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_DataSet_SourceDatasetName",
                table: "Pipelines",
                column: "SourceDatasetName",
                principalTable: "DataSet",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_DataSet_DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_DataSet_SourceDatasetName",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_SourceDatasetName",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "SourceDatasetName",
                table: "Pipelines");
        }
    }
}
