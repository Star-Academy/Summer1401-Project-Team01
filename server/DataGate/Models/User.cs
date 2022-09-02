using System.ComponentModel.DataAnnotations;

namespace DataGate.Models;

public class User
{
    [Key]
    public string Username { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Email { get; set; }//*
    public string Password { get; set; }
    public virtual List<Dataset> ListOfDataSets { get; set; }
    public virtual List<Pipeline> ListOfPipelines { get; set; }
}