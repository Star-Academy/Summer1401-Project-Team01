using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType
{

    public class SortProcess :IProcess
    {
        private readonly ISqlService _sqlService;
        public SortProcess()
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
                var sortOptions = JsonSerializer.Deserialize<SortOptions>(Options.ToString());

                var query = $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
                query += $" ORDER BY \"{sortOptions.OperationColumn}\" ";
                if (sortOptions.SortAscending)
                {
                    query += "ASC";
                }
                else
                {
                    query += "DESC";
                }

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
