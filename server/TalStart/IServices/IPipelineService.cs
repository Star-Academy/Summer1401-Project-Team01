using TalStart.Models;

namespace TalStart.IServices;

public interface IPipelineService
{
    void AddPipeline(string pipelineName, string username);
    void RemovePipeline(string pipelineName, string username);
    void UpdateJson(string json, string name, string username);
    void AddSource(string datasetName, string pipelineName, string username);

    void RemoveSource(string pipelineName, string username);
    void AddDestination(string destinationName, string pipelineName, string username);
    void RemoveDestination(string pipelineName, string username);

    void RenamePipeline(string pipelineName, string username, string newPipelineName);
    List<string> GetAllPipelinesNames(string username);

    Pipeline GetPipeline(string pipelineName, string username);
}