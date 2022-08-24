using TalStart.IServices;
using TalStart.Models.Interfaces;
using TalStart.Services;

namespace TalStart.Models.ProcessType
{
    public class FooProcess : IProcess
    {
        private readonly SqlService _sqlService;
        public FooProcess()
        {
            _sqlService = SqlService.GetInstance();
        }
        public string Name { get; set; }
        public int Id { get;set; }
        public object? Options { get; set; }

        public bool Run(string sourceTable, string finalTable)
        {
            try
            {
                var query = $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
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
