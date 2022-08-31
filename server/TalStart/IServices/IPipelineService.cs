using TalStart.Models;

namespace TalStart.IServices
{
    public interface IPipelineService
    {
        public void AddPipeline(string pipelineName, string username);
        public void RemovePipeline(string pipelineName, string username);
        public void UpdateJson(string json, string name, string username);
        public void AddSource(string datasetName, string pipelineName, string username);

        public void RemoveSource(string pipelineName, string username);
        public void AddDestination(string destinationName, string pipelineName, string username);
        public void RemoveDestination(string pipelineName, string username);

        public void RenamePipeline(string pipelineName, string username, string newPipelineName);
        public List<string> GetAllPipelinesNames(string username);

        public Pipeline GetPipeline(string pipelineName, string username);
    }
}
