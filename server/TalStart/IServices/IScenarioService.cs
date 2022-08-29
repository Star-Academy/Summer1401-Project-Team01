using System.Data;

namespace TalStart.IServices
{
    public interface IScenarioService
    {
        public Task<DataTable> RunPipeline(string pipelineName, string username);

    }
}
