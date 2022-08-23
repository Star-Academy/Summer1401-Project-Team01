using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalStart.Migrations
{
    public partial class seven : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetId",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetId",
                table: "Pipelines");

            migrationBuilder.AlterColumn<int>(
                name: "SourceDatasetId",
                table: "Pipelines",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "DestinationDatasetId",
                table: "Pipelines",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetId",
                table: "Pipelines",
                column: "DestinationDatasetId",
                principalTable: "dataSets",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetId",
                table: "Pipelines",
                column: "SourceDatasetId",
                principalTable: "dataSets",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetId",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetId",
                table: "Pipelines");

            migrationBuilder.AlterColumn<int>(
                name: "SourceDatasetId",
                table: "Pipelines",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "DestinationDatasetId",
                table: "Pipelines",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

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
    }
}
