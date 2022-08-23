using System.ComponentModel.DataAnnotations;

namespace TalStart.Models;

public class DataSet
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public User User { get; set; }

}