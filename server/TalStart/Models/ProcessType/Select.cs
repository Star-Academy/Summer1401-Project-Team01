using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class Select : IProcess
{
    private readonly ISqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;
    
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }
    
    public Select()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var selectOptions = JsonSerializer.Deserialize<SelectOptions>(Options.ToString());

            var query = _queryBuilder.SelectQuery(sourceTable, finalTable, selectOptions.columns);
            
            _sqlService.ExecuteNonQueryPostgres(query);
            
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}