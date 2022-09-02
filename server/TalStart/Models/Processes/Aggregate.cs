using Newtonsoft.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.Processes.Options;
using TalStart.Services;

namespace TalStart.Models.Processes;

public class Aggregate : IProcess
{
    private readonly ISqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;
    
    public Aggregate()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }

    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var aggregateOptions = JsonConvert.DeserializeObject<AggregateOptions>(Options.ToString());
        
            var query = _queryBuilder.AggregateQuery($"\"{sourceTable}\"", 
                aggregateOptions!.ColumnToBeGroupedBy, aggregateOptions.OperationColumn, 
                aggregateOptions.AggregationType.ToString(), $"\"{finalTable}\"");


            _sqlService.ExecuteNonQueryPostgres(query);
        
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}