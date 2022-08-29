using System.Text.Json;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class Join : IProcess
{
    private readonly SqlService _sqlService;

    public Join()
    {
        _sqlService = SqlService.GetInstance();
    }

    public string Name { get; set; }
    public int Id { get; set; }
    public string? Options { get; set; }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var joinOptions = JsonSerializer.Deserialize<JoinOptions>(Options);

            var query = $"SELECT *\n";
            query += $"  INTO \"{finalTable}\" FROM \"{sourceTable}\" \n";
            query += $" {joinOptions.type} JOIN \"{joinOptions.middleDatasetName}\"\n";
            query +=
                $"ON \"{sourceTable}\".{joinOptions.leftVal} = \"{joinOptions.middleDatasetName}\".{joinOptions.rightVal}";
            query += ";";
            _sqlService.ExecuteNonQueryPostgres(query);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}