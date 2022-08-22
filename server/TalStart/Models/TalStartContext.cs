using Microsoft.EntityFrameworkCore;

namespace TalStart.Models
{
    public class TalStartContext : DbContext
    {
        public DbSet<PipelineDbo> Pipelines{ get; set; }
        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql($"Server=127.0.0.1;Port=5432;Database=talStart;User Id=postgres;Password=basilisk79");
        }
    }
}
