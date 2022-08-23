using Microsoft.EntityFrameworkCore;
using TalStart.Properties;

namespace TalStart.Models
{
    public class TalStartContext : DbContext
    {
        public DbSet<PipelineDbo> Pipelines{ get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<DataSet> dataSets  { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(CString.connectionString);
        }
    }
}
