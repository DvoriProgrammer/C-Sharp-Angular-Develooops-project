using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interface;
namespace DataContext
{
    public class Db : DbContext,IContext

    {
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Question> Ouestions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<UserRatings> UserRatings { get; set; }
        public async Task Save() {
            await SaveChangesAsync();
        }       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
          optionsBuilder.UseSqlServer("server=DESKTOP-SSNMLFD;database=develooops_project;TrustServerCertificate=true;trusted_connection=true;");
       }

    }

}
