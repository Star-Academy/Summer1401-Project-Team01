//using System.ComponentModel.DataAnnotations;
namespace TalStart.Models;

public class DataSet
{
    // [Required]
    public string Name { get; set; }
    // [Key]
    public User User { get; set; }
}