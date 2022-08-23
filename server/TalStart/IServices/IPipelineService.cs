namespace TalStart.IServices
{
    public interface IPipelineService
    {
        public bool AddPipeline(string pipelineName);
        public bool UpdateJSON(string JSON, string name);
        public bool AddSource(string datasetName, string pipelineName, string username);

    }
}
