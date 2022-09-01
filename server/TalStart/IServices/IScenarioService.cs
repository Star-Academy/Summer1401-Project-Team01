using System.Data;

namespace TalStart.IServices;

public interface IScenarioService
{
    public Task<DataTable> RunPipeline(string pipelineName, string username);
    public Task<DataTable> PreviewRun(string pipelineName, string username, int lastProcessId);
}