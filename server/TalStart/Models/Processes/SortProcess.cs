using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.Processes.Options;
using TalStart.Services;

namespace TalStart.Models.Processes;

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