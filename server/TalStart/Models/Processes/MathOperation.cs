using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class MathOperation :IProcess
{
    private readonly ISqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;
        
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }

    public MathOperation()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }
        
    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var operationOptions = JsonSerializer.Deserialize<Options.MathOperationOptions>(Options.ToString());

            var query = _queryBuilder.MathOperationQuery(sourceTable, finalTable, operationOptions.FirstColumn,
                operationOptions.SecondColumn, operationOptions.Operation, operationOptions.NewColumn);
                
            _sqlService.ExecuteNonQueryPostgres(query);
                
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}