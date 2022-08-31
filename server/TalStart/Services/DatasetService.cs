using System.Data;
using Newtonsoft.Json;
using Npgsql;
using SqlKata.Execution;
using SqlKata.Compilers;
using TalStart.IServices;
using TalStart.IServices.IParserService;
using TalStart.Properties;
using TalStart.Models;

namespace TalStart.Services
{
    public class DatasetService : IDatasetService
    {
        private readonly TalStartContext _db = new();
        private readonly IParser _parser;
        private readonly ISqlService _sqlService;
        private readonly IQueryBuilder _queryBuilder;
        private readonly IFileService _fileService;

        public DatasetService(IParser parser, IQueryBuilder queryBuilder, IFileService fileService)
        {
            _parser = parser;
            _sqlService = SqlService.GetInstance();
            _queryBuilder = queryBuilder;
            _fileService = fileService;
        }

        public void AddDataset(string username, string datasetName)
        {
            _db.Datasets.Add(new Dataset
                {User = _db.Users.Single(user => user.Username == username), Name = datasetName});
            _db.SaveChanges();
        }

        public bool RemoveDataset(string datasetName, string username)
        {
            try
            {
                var dataset = _db.Datasets.Single(dataset =>
                    dataset.User.Username == username && dataset.Name == datasetName);
                _db.Datasets.Remove(dataset);
                var query = _queryBuilder.DropTableQuery($"\"{datasetName}_{username}\"");
                _sqlService.ExecuteNonQueryPostgres(query);
                _fileService.DeleteFile(datasetName, username);
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
                var dataset = _db.Datasets.SingleOrDefault(dataset =>
                    dataset.User.Username == username && dataset.Name == currentDatasetName);
                if (dataset == null)
                {
                    return false;
                }

                if (_db.Datasets.SingleOrDefault(dataset =>
                        dataset.User.Username == username && dataset.Name == newDatasetName) != null)
                    return false;
                dataset.Name = newDatasetName;
                var query = _queryBuilder.RenameTableQuery($"\"{currentDatasetName}_{username}\"",
                    $"\"{newDatasetName}_{username}\"");
                _sqlService.ExecuteNonQueryPostgres(query);
                _db.SaveChanges();
                _fileService.RenameFile(username, $"{currentDatasetName}",
                    $"{newDatasetName}", ".csv");
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void UpdateDatasetFromTable(string datasetName, string username)
        {
            var tableName = $"{datasetName}.{username}";
            var path = Path.Combine(Configurations.PathToResources, $"{username}", $"{tableName}.csv");
            _parser.ParsePostgresTableToCsv(tableName, path);
        }

        public List<string> GetAllDatasetNames(string username)
        {
            return _db.Datasets.Where(dataset => dataset.User.Username == username).Select(dataset => dataset.Name)
                .ToList();
        }

        public List<string> GetDatasetColumns(string datasetName, string username)
        {
            var query = _queryBuilder.GetColumnNamesQuery($"{datasetName}_{username}");
            var columnNames = new List<string>();
            using var conn = new NpgsqlConnection(CString.connectionString);
            conn.Open();
            using var cmd = new NpgsqlCommand(query, conn);
            var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                columnNames.Add(reader.GetString(0));
            }

            return columnNames;
        }

        public async Task<DataTable> PreviewDataset(string username, string datasetName, int count,
            bool isFullName = false)
        {
            await using var conn = new NpgsqlConnection(CString.connectionString);
            var compiler = new PostgresCompiler();
            var db = new QueryFactory(conn, compiler);
            var tableName = isFullName ? datasetName : $"{datasetName}_{username}";
            var query = await db.Query(tableName).Limit(count).GetAsync();
            var json = JsonConvert.SerializeObject(query);
            var dataTable = (DataTable) JsonConvert.DeserializeObject(json, typeof(DataTable))!;
            return dataTable;
        }
    }
}