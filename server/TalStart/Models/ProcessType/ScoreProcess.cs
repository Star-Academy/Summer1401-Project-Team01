using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType
{
    public class ScoreProcess :IProcess
    {

        private readonly ISqlService _sqlService;
        public ScoreProcess()
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
                var scoreOptions = JsonSerializer.Deserialize<ScoreOptions>(Options.ToString());

                var query = $"SELECT *, (";
                foreach (var column in scoreOptions.Goods)
                {
                    query += $" {column} *";
                }
                query = query[..^1] +")/(";
                foreach (var column in scoreOptions.Bads)
                {
                    query += $" {column} *";
                }
                query = query[..^1] + ")";

                query += $" as \"{scoreOptions.ColumnName}\" INTO \"{finalTable}\" FROM \"{sourceTable}\"";

                _sqlService.ExecuteNonQueryPostgres(query);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
