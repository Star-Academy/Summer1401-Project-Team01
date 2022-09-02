using System.Text.Json;
using DataGate.IServices;
using DataGate.Models.Interfaces;
using DataGate.Models.Processes.Options;
using DataGate.Services;

namespace DataGate.Models.Processes;

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