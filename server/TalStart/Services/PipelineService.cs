using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services
{
    public class PipelineService : IPipelineService
    {
        TalStartContext db = new();

        public bool AddPipeline(string pipelineName, string username)
        {
            try
            {
                db.Pipelines.Add(new PipelineDbo() { Name = pipelineName, User = db.Users.Single(user => user.Username == username)});
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool UpdateJson(string json, string name) 
        {
            try
            {
                var pipeline = db.Pipelines.FirstOrDefault(p=>p.Name == name);
                if (pipeline == null)
                {
                    throw new Exception();
                }
                pipeline.Json = json;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return false;
            }
            return true; 
        }

        public bool AddSource(string sourceName, string pipelineName, string username)
        {
            try
            {
                var pipeline = db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                var sourceDataset = db.dataSets.Single(dataset => dataset.Name == sourceName && dataset.User.Username == username);
                pipeline.SourceDataset = sourceDataset;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return false;
            }
            return true;
        }

        public bool RemoveSource(string pipelineName, string username)
        {
            try
            {
                var pipeline = db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                pipeline.SourceDataset = null;
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool AddDestination(string destinationName, string pipelineName, string username)
        {
            try
            {
                var pipeline = db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                var destinationDataset = db.dataSets.Single(dataset => dataset.Name == destinationName && dataset.User.Username == username);
                pipeline.DestinationDataset = destinationDataset;
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        
        public bool RemoveDestination(string pipelineName, string username)
        {
            try
            {
                var pipeline = db.Pipelines.Single(pipeline => pipeline.Name == pipelineName && pipeline.User.Username == username);
                pipeline.DestinationDataset = null;
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}