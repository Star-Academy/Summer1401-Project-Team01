using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalStart.Migrations
{
    public partial class forth : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataSet_Users_Username",
                table: "DataSet");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_DataSet_DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_DataSet_SourceDatasetName",
                table: "Pipelines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DataSet",
                table: "DataSet");

            migrationBuilder.RenameTable(
                name: "DataSet",
                newName: "dataSets");

            migrationBuilder.RenameIndex(
                name: "IX_DataSet_Username",
                table: "dataSets",
                newName: "IX_dataSets_Username");

            migrationBuilder.AlterColumn<string>(
                name: "SourceDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "DestinationDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "dataSets",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_dataSets",
                table: "dataSets",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_dataSets_Users_Username",
                table: "dataSets",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dataSets_Users_Username",
                table: "dataSets");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_DestinationDatasetName",
                table: "Pipelines");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_dataSets_SourceDatasetName",
                table: "Pipelines");

            migrationBuilder.DropPrimaryKey(
                name: "PK_dataSets",
                table: "dataSets");

            migrationBuilder.RenameTable(
                name: "dataSets",
                newName: "DataSet");

            migrationBuilder.RenameIndex(
                name: "IX_dataSets_Username",
                table: "DataSet",
                newName: "IX_DataSet_Username");

            migrationBuilder.AlterColumn<string>(
                name: "SourceDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DestinationDatasetName",
                table: "Pipelines",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "DataSet",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DataSet",
                table: "DataSet",
                column: "Name");

            migrationBuilder.AddForeignKey(
                name: "FK_DataSet_Users_Username",
                table: "DataSet",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username");

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
    }
}
