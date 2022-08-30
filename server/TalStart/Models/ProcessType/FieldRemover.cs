using System.Text.Json;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class FieldRemover : IProcess
{
    private readonly SqlService _sqlService;

    public FieldRemover()
    {
        _sqlService = SqlService.GetInstance();
    }

    public string Name { get; set; }
    public int Id { get; set; }

    public object? Options { get; set; }


    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var selectOptions = JsonSerializer.Deserialize<FieldRemoverOptions>(Options.ToString());
            var query = $"ALTER TABLE \"{sourceTable}\" \n";
            query = selectOptions.columns.Aggregate(query, (current, column) => current + $"DROP COLUMN {column},\n");

            query = query[..^1] + ";";
            _sqlService.ExecuteNonQueryPostgres(query);
            query = $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
            _sqlService.ExecuteNonQueryPostgres(query);
            return true;
        }
        catch
        {
            return false;
        }
    }
}