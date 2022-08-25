using System.Data;
using Newtonsoft.Json;
using Npgsql;
using SqlKata;
using SqlKata.Execution;
using SqlKata.Compilers;
using TalStart.IServices;
using TalStart.Properties;
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
        
         public async Task<DataTable> PreviewDataset(string username, string datasetName, int count)
        {
        await using var conn = new NpgsqlConnection(CString.connectionString);
        var compiler = new PostgresCompiler();
        var db = new QueryFactory(conn, compiler);
        var tableName = $"{datasetName}.{username}";

        var query = await db.Query(tableName).Limit(count).GetAsync();
        var json = JsonConvert.SerializeObject(query);
        var dataTable = (DataTable) JsonConvert.DeserializeObject(json, (typeof(DataTable)));
        return dataTable;
        }
    }
}