using DataGate.Models.Enums;

namespace DataGate.Models.Processes.Options;

public class AggregateOptions
{
    public string ColumnToBeGroupedBy { get; set; }
    public string OperationColumn { get; set; }
    public AggregationType AggregationType { get; set; }
}

