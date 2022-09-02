using System.Text.Json;
using DataGate.IServices;
using DataGate.Models.Interfaces;
using DataGate.Models.Processes.Options;
using DataGate.Services;

namespace DataGate.Models.Processes;

public class FieldRemover : IProcess
{
    private readonly SqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;
    
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }

    public FieldRemover()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var fieldRemoverOptions = JsonSerializer.Deserialize<FieldRemoverOptions>(Options.ToString());
            
            var query = _queryBuilder.FieldRemoverQuery(sourceTable, fieldRemoverOptions.columns);
            
            _sqlService.ExecuteNonQueryPostgres(query);
            
            query = _queryBuilder.CopyTableIntoTableQuery(sourceTable, finalTable);
            
            _sqlService.ExecuteNonQueryPostgres(query);
            
            return true;
        }
        catch
        {
            return false;
        }
    }
}