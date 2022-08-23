using TalStart.Models;
using TalStart.Models.Interfaces;

namespace TalStart.Services
{
    public class ScenarioService : IScenarioService
    {
        TalStartContext db = new TalStartContext();
        public bool RunPipeline(string pipelineName, string username) {
            var pipe = MakePipeline(pipelineName, username);
            foreach (var process in pipe.TreeOfProcesses)
            {
                process.Run();
            }
            return true;
        }
        private Pipeline? MakePipeline(string pipelineName, string username)
        {
            try
            {
                var pipeDbo = db.Pipelines.FirstOrDefault(p => p.Name == pipelineName && p.User.Username == username);
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
                /* TODO: 
                 
                 */
                
                return pipe;

            }
            catch (Exception e)
            {
                throw;
            }
        }

    }
}
