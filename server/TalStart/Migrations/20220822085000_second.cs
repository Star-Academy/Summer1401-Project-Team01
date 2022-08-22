using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TalStart.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataSet_Users_UserName",
                table: "DataSet");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_Users_UserName",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_UserName",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_DataSet_UserName",
                table: "DataSet");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Pipelines");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "DataSet");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Users",
                newName: "Lastname");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Users",
                newName: "Firstname");

            migrationBuilder.RenameColumn(
                name: "UserName",
                table: "Users",
                newName: "Username");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "DataSet",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_Username",
                table: "Pipelines",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_DataSet_Username",
                table: "DataSet",
                column: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_DataSet_Users_Username",
                table: "DataSet",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_Users_Username",
                table: "Pipelines",
                column: "Username",
                principalTable: "Users",
                principalColumn: "Username",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DataSet_Users_Username",
                table: "DataSet");

            migrationBuilder.DropForeignKey(
                name: "FK_Pipelines_Users_Username",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_Pipelines_Username",
                table: "Pipelines");

            migrationBuilder.DropIndex(
                name: "IX_DataSet_Username",
                table: "DataSet");

            migrationBuilder.RenameColumn(
                name: "Lastname",
                table: "Users",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Firstname",
                table: "Users",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "UserName");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Pipelines",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "Username",
                table: "DataSet",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "DataSet",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pipelines_UserName",
                table: "Pipelines",
                column: "UserName");

            migrationBuilder.CreateIndex(
                name: "IX_DataSet_UserName",
                table: "DataSet",
                column: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_DataSet_Users_UserName",
                table: "DataSet",
                column: "UserName",
                principalTable: "Users",
                principalColumn: "UserName");

            migrationBuilder.AddForeignKey(
                name: "FK_Pipelines_Users_UserName",
                table: "Pipelines",
                column: "UserName",
                principalTable: "Users",
                principalColumn: "UserName",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
