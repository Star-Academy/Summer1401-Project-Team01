using Newtonsoft.Json;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;

namespace TalStart.Models.ProcessType;

public class Aggregate : IProcess
{
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }
    public bool Run(string sourceTable, string finalTable)
    {
        var aggregateOptions = JsonConvert.DeserializeObject<AggregateOptions>(Options.ToString());
        
        return true;
    }
}