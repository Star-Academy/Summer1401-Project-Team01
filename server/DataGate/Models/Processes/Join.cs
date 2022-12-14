using System.Text.Json;
using DataGate.IServices;
using DataGate.Models.Interfaces;
using DataGate.Models.Processes.Options;
using DataGate.Services;

namespace DataGate.Models.Processes;

public class Join : IProcess
{
    private readonly SqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;
    
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }

    public Join()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var joinOptions = JsonSerializer.Deserialize<JoinOptions>(Options.ToString());

            var query = _queryBuilder.JoinQuery(sourceTable, finalTable, joinOptions.type,
                joinOptions.middleDatasetName, joinOptions.leftVal, joinOptions.rightVal);

            _sqlService.ExecuteNonQueryPostgres(query);

            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}