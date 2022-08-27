using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType;

public class Select : IProcess
{
    private readonly ISqlService _sqlService;
    public Select()
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
            var filterOptions = JsonSerializer.Deserialize<SelectOptions>(Options.ToString());

            var query = $"SELECT ";
            foreach (var column in filterOptions.columns)
            {
                query += $"\"{column}\"" +',';
            }
            query = query.Substring(0,query.Length - 1);
            query += $"  INTO \"{finalTable}\" FROM \"{sourceTable}\"";

            _sqlService.ExecuteNonQueryPostgres(query);
            return true;
        }
        catch (Exception)
        {
            return false;
        }


        throw new NotImplementedException();
    }
}