using TalStart.IServices;
using TalStart.Models;

namespace TalStart.Services
{
    public class DatasetService : IDatasetService
    {
        TalStartContext db = new();
        public bool AddDataset(string username, string datasetName)
        {
            try
            {
                db.dataSets.Add(new Dataset() { User = db.Users.Single(user => user.Username == username), Name = datasetName });
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
                var dataset = db.dataSets.Single(dataset => dataset.User.Username == username && dataset.Name == datasetName);
                db.dataSets.Remove(dataset);
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public bool RenameDataset(string currentDatasetName, string username, string newDatasetName)
        {
            throw new NotImplementedException();
        }
    }
}