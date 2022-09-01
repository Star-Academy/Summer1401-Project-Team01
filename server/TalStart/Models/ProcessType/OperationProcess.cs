using System.Text.Json;
using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Models.ProcessType.Options;
using TalStart.Services;

namespace TalStart.Models.ProcessType
{
    public class OperationProcess :IProcess
    {
        private readonly ISqlService _sqlService;
        public OperationProcess()
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
                var operationOptions = JsonSerializer.Deserialize<OperationOptions>(Options.ToString());

                var query = $"SELECT *, {operationOptions.FirstColumn} {operationOptions.Operation} {operationOptions.SecondColumn} " +
                    $"as {operationOptions.NewColumn} ";

                query += $"  INTO \"{finalTable}\" FROM \"{sourceTable}\"";

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
