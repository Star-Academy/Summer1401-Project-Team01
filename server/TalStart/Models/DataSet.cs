//using System.ComponentModel.DataAnnotations;
namespace DefaultNamespace;

public class DataSet
{
    // [Required]
    public string Name { get; set; }
    // [Key]
    public User User { get; set; }
}