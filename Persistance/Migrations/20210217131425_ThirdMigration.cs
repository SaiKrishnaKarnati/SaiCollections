using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class ThirdMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Posts",
                newName: "price");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Posts",
                newName: "category");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "price",
                table: "Posts",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "category",
                table: "Posts",
                newName: "Type");
        }
    }
}
