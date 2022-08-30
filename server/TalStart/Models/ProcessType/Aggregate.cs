using Newtonsoft.Json;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class Aggregate : IProcess
{
    private readonly SqlService _sqlService;
    private readonly QueryBuilder _queryBuilder;
    
    public Aggregate()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new QueryBuilder();
    }

    public string Name { get; set; }
    public int Id { get; set; }
    public Object? Options { get; set; }
    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var aggregateOptions = JsonConvert.DeserializeObject<AggregateOptions>(Options.ToString());
        
            var query = _queryBuilder.AggregateQuery(sourceTable, 
                aggregateOptions!.ColumnToBeGroupedBy, aggregateOptions.OperationColumn, 
                aggregateOptions.AggregationType.ToString(), finalTable);
        
            _sqlService.ExecuteNonQueryPostgres(query);
        
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}