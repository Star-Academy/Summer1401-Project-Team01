using Microsoft.EntityFrameworkCore;
using DataGate.Properties;

namespace DataGate.Models;

public class DataGateContext : DbContext
{
    public DbSet<Pipeline?> Pipelines { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Dataset> Datasets { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(CString.connectionString);
    }
}