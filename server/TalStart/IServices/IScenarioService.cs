using System.Data;

namespace TalStart.IServices;

public interface IScenarioService
{
    Task<DataTable> RunPipeline(string pipelineName, string username);
    Task<DataTable> PreviewRun(string pipelineName, string username, int lastProcessId);
}