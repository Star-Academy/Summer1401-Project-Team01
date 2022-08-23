namespace TalStart.IServices
{
    public interface IPipelineService
    {
        public bool AddPipeline(string pipelineName);
        public bool UpdateJSON(string JSON, string name);
    }
}
