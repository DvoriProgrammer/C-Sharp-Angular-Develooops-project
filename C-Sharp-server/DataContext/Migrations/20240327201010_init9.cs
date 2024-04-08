using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataContext.Migrations
{
    /// <inheritdoc />
    public partial class init9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRatings_Answers_AnsId",
                table: "UserRatings");

            migrationBuilder.DropIndex(
                name: "IX_UserRatings_AnsId",
                table: "UserRatings");

            migrationBuilder.DropColumn(
                name: "AnsId",
                table: "UserRatings");

            migrationBuilder.CreateIndex(
                name: "IX_UserRatings_AnswerId",
                table: "UserRatings",
                column: "AnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRatings_Answers_AnswerId",
                table: "UserRatings",
                column: "AnswerId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRatings_Answers_AnswerId",
                table: "UserRatings");

            migrationBuilder.DropIndex(
                name: "IX_UserRatings_AnswerId",
                table: "UserRatings");

            migrationBuilder.AddColumn<long>(
                name: "AnsId",
                table: "UserRatings",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_UserRatings_AnsId",
                table: "UserRatings",
                column: "AnsId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRatings_Answers_AnsId",
                table: "UserRatings",
                column: "AnsId",
                principalTable: "Answers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
