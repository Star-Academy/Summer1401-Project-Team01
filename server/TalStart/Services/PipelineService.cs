using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services
{
    public class PipelineService : IPipelineService
    {
        TalStartContext _db = new();
        
        public bool AddPipeline(string pipelineName, string username)
        {
            try
            {
                _db.Pipelines.Add(new PipelineDbo() { Name = pipelineName, User = _db.Users.Single(user => user.Username == username)});
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


        public bool RemovePipeline(string pipelineName, string username)
        {
            try
            {
                _db.Pipelines.Remove(_db.Pipelines.Single(pipeline =>
                    pipeline.Name == pipelineName && pipeline.User.Username == username));
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateJson(string json, string name) 
        {
            try
            {
                var pipeline = _db.Pipelines.FirstOrDefault(p=>p.Name == name);
                if (pipeline == null)
                {
                    throw new Exception();
                }
                pipeline.Json = json;
                _db.SaveChanges();
            }
            catch (Exception)
            {
                return false;
            }
            return true; 
        }

        public bool AddSource(string sourceName, string pipelineName, string username)
        {
            try
            {
                var pipeline = _db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                var sourceDataset = _db.datasets.Single(dataset => dataset.Name == sourceName && dataset.User.Username == username);
                pipeline.SourceDataset = sourceDataset;
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool RemoveSource(string pipelineName, string username)
        {
            try
            {
                var pipeline = _db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                pipeline.SourceDataset = null;
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool AddDestination(string destinationName, string pipelineName, string username)
        {
            try
            {
                var pipeline = _db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                var destinationDataset = _db.datasets.Single(dataset => dataset.Name == destinationName && dataset.User.Username == username);
                pipeline.DestinationDataset = destinationDataset;
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        
        public bool RemoveDestination(string pipelineName, string username)
        {
            try
            {
                var pipeline = _db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                pipeline.DestinationDataset = null;
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool RenamePipeline(string pipelineName, string username, string newPipelineName)
        {
            try
            {
                _db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username)
                    .Name = newPipelineName;
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<string> GetAllPipelinesNames(string username)
        {
            return _db.Pipelines.Where(pipeline => pipeline.User.Username == username).Select(pipeline => pipeline.Name).ToList();
        }
    }
}