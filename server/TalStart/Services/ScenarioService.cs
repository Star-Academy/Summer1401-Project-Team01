using System.Text.Json;
using TalStart.IServices;
using TalStart.Models;
using TalStart.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using TalStart.Models.ProcessType;

namespace TalStart.Services
{
    public class ScenarioService : IScenarioService
    {
        private TalStartContext _db = new();
        private ISqlService _sqlService;
        public ScenarioService(ISqlService SqlService)
        {
            _sqlService = SqlService;
        }

        public bool RunPipeline(string pipelineName, string username) {
            var pipe = MakePipeline(pipelineName, username);
            var sourceTable = $"{pipe.SourceDataset.Name}.{ pipe.User.Username}";
            var finalTable = sourceTable + 1;
            var tempTables = new List<string>();
            foreach (var process in pipe.TreeOfProcesses)
            {
                tempTables.Add(finalTable);
                process.Run(sourceTable, finalTable);
                sourceTable = finalTable;
                finalTable += '1';
            }
            finalTable = finalTable.Substring(0, finalTable.Length - 1);
            sourceTable = finalTable;
            finalTable = $"{pipe.DestinationDataset.Name}.{pipe.User.Username}";
            var query = $"DROP TABLE \"{pipe.DestinationDataset.Name}.{pipe.User.Username}\" ";
            _sqlService.ExecuteNonQueryPostgres(query);
            query = $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
            _sqlService.ExecuteNonQueryPostgres(query);

            foreach (var temp in tempTables)
            {
                query = $"DROP TABLE \"{temp}\" ";
                _sqlService.ExecuteNonQueryPostgres(query);

            }

            return true;
        }
        private Pipeline? MakePipeline(string pipelineName, string username)
        {
            try
            {
                var pipe = _db.Pipelines.Include(a => a.DestinationDataset).Include(a => a.SourceDataset)
                    .Include(a => a.User).FirstOrDefault(p => p.Name == pipelineName && p.User.Username == username);
                if (pipe == null || pipe.SourceDataset == null || pipe.DestinationDataset == null)
                {
                    return null;
                }
                pipe.TreeOfProcesses = new List<IProcess>();
                var res = JsonSerializer.Deserialize<List<Process>>(pipe.Json);
                res.OrderBy(r => r.Id);
                foreach (var r in res)
                {
                    switch (r.Name)
                    {
                        case "foo":
                            pipe.TreeOfProcesses.Add(new FooProcess { Id = r.Id, Name = r.Name, Options = r.Options});
                            break;
                        case "select":
                            pipe.TreeOfProcesses.Add(new Select {Id = r.Id, Name = r.Name, Options = r.Options});

                            break;
                    }
                }
                return pipe;

            }
            catch (Exception e)
            {
                throw;
            }
        }

    }
}
