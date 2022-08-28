using TalStart.Models.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TalStart.Models;

public class Pipeline
{
    public string Name { get; set; }
    public string? Json { get; set; }
    public Dataset? SourceDataset { get; set; }
    public Dataset? DestinationDataset { get; set; }

    public User User { get; set; }
    [Key]
    public int Id { get; set; }
    [NotMapped]
    public List<IProcess> TreeOfProcesses { get; set; }
}