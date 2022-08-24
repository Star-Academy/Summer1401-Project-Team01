using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services;

public class DatasetService : IDatasetService
{
    TalStartContext db = new();
    public PipelineService()
    {

    }
    public bool AddDataset(string username, string datasetName)
    {
        try
        {
            db.dataSets.Add(new DataSet() { User = db.Users.SingleOrDefault(user => user.Username == username), Name = datasetName });
            db.SaveChanges();
            return true;
        }
        catch (Exception e)
        {
            return false;
        }
    }
}