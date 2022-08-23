namespace TalStart.Models.Interfaces
{
    public interface IScenarioService
    {
        public bool RunPipeline(string pipelineName, string username);

    }
}
