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

    }
}
