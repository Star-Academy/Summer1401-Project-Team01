using TalStart.Models.Enums;

namespace TalStart.Models.ProcessType.Options;

public class AggregateOptions
{
    public string ColumnToBeGroupedBy { get; set; }
    public string OperationColumn { get; set; }
    public AggregationType AggregationType { get; set; }
}

