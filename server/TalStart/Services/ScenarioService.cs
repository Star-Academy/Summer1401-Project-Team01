using System.Text.Json;
using System.Linq;
using TalStart.IServices;
using TalStart.Models;
using TalStart.Models.Interfaces;
using Microsoft.EntityFrameworkCore;
using TalStart.Models.ProcessType;

namespace TalStart.Services
{
    public class ScenarioService : IScenarioService
    {
        TalStartContext db = new TalStartContext();
        ISqlService _SqlService;
        public ScenarioService()
        {
            _SqlService = SqlService.GetInstance();
        }

        public bool RunPipeline(string pipelineName, string username) {
            var pipe = MakePipeline(pipelineName, username);
            var sourceTable = $"{pipe.Source.Name}.{ pipe.User.Username}";
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
            finalTable = $"{pipe.Destination.Name}.{pipe.User.Username}";
            var query = $"DROP TABLE \"{pipe.Destination.Name}.{pipe.User.Username}\" ";
            _SqlService.ExecuteNonQueryPostgres(query);
            query = $"SELECT * INTO \"{finalTable}\" FROM \"{sourceTable}\"";
            _SqlService.ExecuteNonQueryPostgres(query);

            foreach (var temp in tempTables)
            {
                query = $"DROP TABLE \"{temp}\" ";
                _SqlService.ExecuteNonQueryPostgres(query);

            }

            return true;
        }
        private Pipeline? MakePipeline(string pipelineName, string username)
        {
            try
            {
                var pipeDbo = db.Pipelines.Include(a => a.DestinationDataset).Include(a => a.SourceDataset)
                    .Include(a => a.User).FirstOrDefault(p => p.Name == pipelineName && p.User.Username == username);
                if (pipeDbo == null || pipeDbo.SourceDataset == null || pipeDbo.DestinationDataset == null)
                {
                    return null;
                }
                var  pipe = new Pipeline();
                pipe.Name = pipeDbo.Name;
                pipe.User = pipeDbo.User;
                pipe.Source = pipeDbo.SourceDataset;
                pipe.Destination = pipeDbo.DestinationDataset;
                pipe.TreeOfProcesses = new List<IProcess>();
                var res = JsonSerializer.Deserialize<List<Process>>(pipeDbo.Json);
                res.OrderBy(r => r.Id);
                foreach (var r in res)
                {
                    switch (r.Name)
                    {
                        case "foo":
                            pipe.TreeOfProcesses.Add(new FooProcess { Id = r.Id, Name = r.Name, Options = r.Options});
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
