using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

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