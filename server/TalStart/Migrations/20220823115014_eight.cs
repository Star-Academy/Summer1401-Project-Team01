using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalStart.Migrations
{
    public partial class eight : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_Users_Username",
                table: "Pipelines");

            migrationBuilder.RenameColumn(
                name: "JSON",
                table: "Pipelines",
                newName: "Json");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Pipelines",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Json",
                table: "Pipelines",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_Users_Username",
                table: "Pipelines",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_Users_Username",
                table: "Pipelines");

            migrationBuilder.RenameColumn(
                name: "Json",
                table: "Pipelines",
                newName: "JSON");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "Pipelines",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "JSON",
                table: "Pipelines",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_Users_Username",
                table: "Pipelines",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
