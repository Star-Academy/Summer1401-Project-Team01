namespace TalStart.Models.Processes.Options;

public class FilterOptions
{
    public string columnName { get; set; }
    public string @operator { get; set; }
    public string value { get; set; }

    public override string ToString()
    {
        return $"{columnName} {@operator} \'{value}\'";
    }
}