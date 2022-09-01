namespace TalStart.Models.Interfaces;

public interface IProcess
{
    string Name { get; set; }
    int Id { get; set; }
    object? Options { get; set; }

    bool Run(string sourceTable, string finalTable);
}