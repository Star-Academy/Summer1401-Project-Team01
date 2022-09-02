using System.Text.Json;
using DataGate.IServices;
using DataGate.Models.Interfaces;
using DataGate.Models.ProcessType.Options;
using DataGate.Services;

namespace DataGate.Models.ProcessType;

public class Score :IProcess
{

    private readonly ISqlService _sqlService;
    private readonly IQueryBuilder _queryBuilder;
        
    public string Name { get; set; }
    public int Id { get; set; }
    public object? Options { get; set; }

    public Score()
    {
        _sqlService = SqlService.GetInstance();
        _queryBuilder = new PostgresQueryBuilder();
    }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var scoreOptions = JsonSerializer.Deserialize<ScoreOptions>(Options.ToString());

            var query = _queryBuilder.ScoreQuery(sourceTable, finalTable, scoreOptions.Goods, scoreOptions.Bads,
                scoreOptions.ColumnName);

            _sqlService.ExecuteNonQueryPostgres(query);
                
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}