using Microsoft.EntityFrameworkCore;
using DataGate.IServices;
using DataGate.Models;

namespace DataGate.Services;

public class PipelineService : IPipelineService
{
    private readonly DataGateContext _db = new();

    public void AddPipeline(string pipelineName, string username)
    {
        _db.Pipelines.Add(new Pipeline()
            { Name = pipelineName, User = _db.Users.Single(user => user.Username == username) });
        _db.SaveChanges();
    }


    public void RemovePipeline(string pipelineName, string username)
    {
        _db.Pipelines.Remove(_db.Pipelines.Single(pipeline =>
            pipeline.Name == pipelineName && pipeline.User.Username == username));
        _db.SaveChanges();
    }

    public void UpdateJson(string json, string pipeName, string username)
    {
        var pipeline = _db.Pipelines.FirstOrDefault(pipeline =>
            pipeline.Name == pipeName && pipeline.User.Username == username);

        pipeline.Json = json;
        _db.SaveChanges();
    }

    public void AddSource(string sourceName, string pipelineName, string username)
    {
        var pipeline = _db.Pipelines.Single(pipeline =>
            pipeline.Name == pipelineName && pipeline.User.Username == username);
        var sourceDataset = _db.Datasets.Single(dataset =>
            dataset.Name == sourceName && dataset.User.Username == username);
        pipeline.SourceDataset = sourceDataset;
        _db.SaveChanges();
    }

    public void RemoveSource(string pipelineName, string username)
    {
        var pipeline = _db.Pipelines.Single(pipeline =>
            pipeline.Name == pipelineName && pipeline.User.Username == username);
        pipeline.SourceDataset = null;
        _db.SaveChanges();
    }

    public void AddDestination(string destinationName, string pipelineName, string username)
    {
        var pipeline = _db.Pipelines.Single(pipeline =>
            pipeline.Name == pipelineName && pipeline.User.Username == username);
        var destinationDataset = _db.Datasets.Single(dataset =>
            dataset.Name == destinationName && dataset.User.Username == username);
        pipeline.DestinationDataset = destinationDataset;
        _db.SaveChanges();
    }


    public void RemoveDestination(string pipelineName, string username)
    {
        var pipeline = _db.Pipelines.Single(pipeline =>
            pipeline.Name == pipelineName && pipeline.User.Username == username);
        pipeline.DestinationDataset = null;
        _db.SaveChanges();
    }

    public void RenamePipeline(string pipelineName, string username, string newPipelineName)
    {
        _db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username)
            .Name = newPipelineName;
        _db.SaveChanges();
    }

    public List<string> GetAllPipelinesNames(string username)
    {
        return _db.Pipelines.Where(pipeline => pipeline.User.Username == username).Select(pipeline => pipeline.Name)
            .ToList();
    }

    public Pipeline GetPipeline(string pipelineName, string username)
    {
        return _db.Pipelines.Include(a => a.DestinationDataset).Include(a => a.SourceDataset)
            .FirstOrDefault(p => p.Name == pipelineName && p.User.Username == username);
    }
}