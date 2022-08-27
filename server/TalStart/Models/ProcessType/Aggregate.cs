using TalStart.Models.Interfaces;

namespace TalStart.Models.ProcessType;

public class Aggregate : IProcess
{
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }
    public bool Run(string sourceTable, string finalTable)
    {
        throw new NotImplementedException();
    }
}