using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services
{
    public class PipelineService :IPipelineService
    {
        TalStartContext db = new TalStartContext();
        public PipelineService()
        {

        }
        public bool AddPipeline(string pipelineName)
        {

            return true;
        }
        public bool UpdateJSON(string JSON, string name) 
        {
            try
            {
                var pipe = db.Pipelines.FirstOrDefault(p=>p.Name == name);
                if (pipe == null)
                {
                    throw new Exception();
                }
                pipe.JSON = JSON;
                db.SaveChanges();
            }
            catch (Exception e)
            {
                return false;
            }
            return true; 
        }

        public bool AddSource(string datasetName, string pipelineName, string username)
        {
            try
            {
                var pipe = db.Pipelines.FirstOrDefault(p => p.Name == pipelineName && p.User.Username == username);
                if (pipe == null)
                {
                    return false;
                }
                var dataset = db.dataSets.FirstOrDefault(d => d.Name == datasetName && d.User.Username == username);
                if (dataset == null)
                {
                    return false;
                }
                pipe.SourceDataset = dataset;
                db.SaveChanges();
            }
            catch (Exception e)
            {

                return false;
            }
            return true;
        }


    }
}
