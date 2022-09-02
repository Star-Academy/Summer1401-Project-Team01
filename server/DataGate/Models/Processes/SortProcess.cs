using System.Text.Json;
using DataGate.IServices;
using DataGate.Models.Interfaces;
using DataGate.Models.Processes.Options;
using DataGate.Services;

namespace DataGate.Models.Processes;

public class SortProcess : IProcess
{
    private readonly ISqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;

    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }

    public SortProcess()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var sortOptions = JsonSerializer.Deserialize<SortOptions>(Options.ToString());

            var query = _queryBuilder.SortQuery(sourceTable, finalTable, sortOptions.OperationColumn,
                sortOptions.SortAscending);

            _sqlService.ExecuteNonQueryPostgres(query);

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}