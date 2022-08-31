using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class Filter : IProcess
{
    private readonly ISqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;
    
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }

    public Filter()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var filterOptions = JsonSerializer.Deserialize<FilterOptions>(Options.ToString());

            var query = _queryBuilder.FilterQuery(sourceTable, finalTable, filterOptions);
            
            _sqlService.ExecuteNonQueryPostgres(query);
            
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}