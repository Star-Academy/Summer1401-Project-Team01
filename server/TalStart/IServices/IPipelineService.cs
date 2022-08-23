namespace TalStart.IServices
{
    public interface IPipelineService
    {
        public bool AddPipeline(string pipelineName, string username);
        public bool RemovePipeline(string pipelineName, string username);
        public bool UpdateJson(string json, string name);
        public bool AddSource(string datasetName, string pipelineName, string username);

        public bool RemoveSource(string pipelineName, string username);
        public bool AddDestination(string destinationName, string pipelineName, string username);
        public bool RemoveDestination(string pipelineName, string username);

        public bool RenamePipeline(string pipelineName, string username, string newPipelineName);
    }
}
