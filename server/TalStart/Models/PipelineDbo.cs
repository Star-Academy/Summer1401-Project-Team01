using System.ComponentModel.DataAnnotations;

namespace TalStart.Models
{
    public class PipelineDbo
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public Dataset? SourceDataset{ get; set; }
        public Dataset? DestinationDataset { get; set; }
        public string? Json { get; set; }
        public User User { get; set; }
    }
}
