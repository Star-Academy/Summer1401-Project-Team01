namespace TalStart.Models;

public class Csv
{
    // File received from http request.
    public IFormFile FormFile { get; set; }
    public bool HasHeader { get; set; }
    public string Delimiter { get; set; }
}