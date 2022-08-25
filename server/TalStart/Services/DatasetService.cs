using System.Data;
using Newtonsoft.Json;
using Npgsql;
using SqlKata.Execution;
using SqlKata.Compilers;
using TalStart.IServices;
using TalStart.Properties;
using TalStart.Models;

namespace TalStart.Services
{
    public class DatasetService : IDatasetService
    {
        TalStartContext _db = new();
        public bool AddDataset(string username, string datasetName)
        {
            try
            {
                _db.Datasets.Add(new Dataset { User = _db.Users.Single(user => user.Username == username), Name = datasetName });
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool RemoveDataset(string username, string datasetName)
        {
            try
            {
                var dataset = _db.Datasets.Single(dataset => dataset.User.Username == username && dataset.Name == datasetName);
                _db.Datasets.Remove(dataset);
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool RenameDataset(string currentDatasetName, string username, string newDatasetName)
        {
            try
            {
                var dataset = _db.Datasets.Single(dataset => dataset.User.Username == username && dataset.Name == currentDatasetName);
                dataset.Name = newDatasetName;
                _db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<string> GetAllDatasetNames(string username)
        {
            return _db.Datasets.Where(dataset => dataset.User.Username == username).Select(dataset => dataset.Name).ToList();
        }

        public async Task<DataTable> PreviewDataset(string username, string datasetName, int count)
        {
        await using var conn = new NpgsqlConnection(CString.connectionString);
        var compiler = new PostgresCompiler();
        var db = new QueryFactory(conn, compiler);
        var tableName = $"{datasetName}.{username}";

        var query = await db.Query(tableName).Limit(count).GetAsync();
        var json = JsonConvert.SerializeObject(query);
        var dataTable = (DataTable) JsonConvert.DeserializeObject(json, typeof(DataTable))!;
        return dataTable;
        }
    }
}