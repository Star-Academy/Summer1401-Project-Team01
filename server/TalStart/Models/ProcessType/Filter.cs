using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class Filter : IProcess
{
    private readonly ISqlService _sqlService;

    public Filter()
    {
        _sqlService = SqlService.GetInstance();
    }

    public string Name { get; set; }
    public int Id { get; set; }
    public Object? Options { get; set; }

    public bool Run(string sourceTable, string finalTable)
    {
        try
        {
            var filterOptions = JsonSerializer.Deserialize<FilterOptions>(Options.ToString());

            var query = $"SELECT *\n";
            query += $"  INTO \"{finalTable}\" FROM \"{sourceTable}\" \n";
            query += $" WHERE\n";
            query += filterOptions + ";";
            _sqlService.ExecuteNonQueryPostgres(query);
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}