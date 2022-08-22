using System.ComponentModel.DataAnnotations;

namespace TalStart.Models
{
    public class PipelineDbo
    {
        [Key]
        public string Name { get; set; }
        public string JSON { get; set; }
        public User User { get; set; }
    }
}
