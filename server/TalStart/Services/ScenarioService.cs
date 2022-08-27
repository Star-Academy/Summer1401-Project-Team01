using System.Text.Json;
using TalStart.IServices;
using TalStart.Models;
using TalStart.Models.Interfaces;

namespace TalStart.Services
{
    public class ScenarioService : IScenarioService
    {
        TalStartContext _db = new();
        ISqlService _sqlService;
        public ScenarioService()
        {
            _sqlService = SqlService.GetInstance();
        }

        public bool RunPipeline(string pipelineName, string username)
        {
            var pipe = _db.Pipelines.Single(pipeline =>
                pipeline.Name == pipelineName && pipeline.User.Username == username);

            var treeOfProcesses = JsonSerializer.Deserialize<List<IProcess>>(pipe.Json);

            var sourceTable = $"{pipe.SourceDataset.Name}.{pipe.User.Username}";
            var finalTable = sourceTable + 1;
            var tempTables = new List<string>();
            foreach (var process in treeOfProcesses)
            {
                tempTables.Add(finalTable);
                process.Run(sourceTable, finalTable);
                sourceTable = finalTable;
                finalTable += '1';
            }

            finalTable = finalTable.Substring(0, finalTable.Length - 1);
            sourceTable = finalTable;
            finalTable = $"{pipe.DestinationDataset.Name}.{pipe.User.Username}";

            #region Drop Table

            var query = $"DROP TABLE \"{pipe.DestinationDataset.Name}.{pipe.User.Username}\" ";
            _sqlService.ExecuteNonQueryPostgres(query);
            query = $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
            _sqlService.ExecuteNonQueryPostgres(query);

            foreach (var temp in tempTables)
            {
                query = $"DROP TABLE \"{temp}\" ";
                _sqlService.ExecuteNonQueryPostgres(query);
            }

            #endregion

            return true;
        }
    }
}
