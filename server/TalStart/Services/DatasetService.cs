using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services
{
    public class DatasetService : IDatasetService
    {
        TalStartContext db = new();
        public DatasetService()
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

        public bool RemoveDataset(string username, string datasetName)
        {
            try
            {
                var dataset = db.DataSets.FirstOrDefault(ds.User.Username == username && ds => ds.Name = datasetName);
                if (dataset == null)
                    return false;
                db.DataSets.Remove(dataset);
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RenameDataset(string username, string datasetName)
        {

        }
    }
}