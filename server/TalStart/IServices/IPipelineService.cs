namespace TalStart.IServices
{
    public interface IPipelineService
    {
        public bool AddPipeline(string pipelineName);
        public bool UpdateJSON(string JSON, string name);
        public bool AddSource(string datasetName, string pipelineName, string username);

        public bool RemoveSource(string pipelineName, string username);
        public bool AddDestination(string destinationName, string pipelineName, string username);
        public bool RemoveDestination(string pipelineName, string username);
    }
}
